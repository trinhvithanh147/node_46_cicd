import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";
import {
  BadRequestException,
  Unauthorization,
} from "../common/helpers/erorr.helper.js";
import sendMail from "../common/nodemailer/send-mail.nodemailer.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authService = {
  // dành cho api
  register: async (req) => {
    // Bước 1: nhận dữ liệu: full_name ,email, pass_word;
    const { full_name, email, pass_word } = req.body;
    console.log({ full_name, email, pass_word });
    //Bước 2: lấy email và kiểm tra trong db xem đã có người dùng đó hay chưa
    const userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    // console.log(userExists);
    if (userExists) {
      throw new BadRequestException(`Tài khoản đã tồn tại, Vui lòng đăng nhập`);
    }

    // mã hóa password
    const passHash = bcrypt.hashSync(pass_word, 10);

    //Bước 3: tạo người dùng mới
    const userNew = await prisma.users.create({
      data: {
        email: email,
        full_name: full_name,
        pass_word: passHash,
      },
    });

    // xóa password khi trả về
    delete userNew.pass_word;

    // gửi email chào mừng
    //1 - tốc độ: đăng ký nhanh và không cần đợi quá trình xử lý => không dùng await
    //2 - chắc chắn: đăng ký chậm và cần phải đợi email gửi thành công => await
    sendMail(`trinhvidanhthanh@gmail.com`).catch((err) => {
      console.log(`Lỗi gửi email:`, err);
    });
    //Bước 4: trả kết quả thành công
    return userNew;
  },
  login: async (req) => {
    const { email, pass_word } = req.body;
    console.log({ email, pass_word });

    const userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new BadRequestException(`Tài khoản chưa tồn tại vui lòng đăng kí`);
    }
    if (!userExists.pass_word) {
      if (userExists.face_app_id) {
        throw new BadRequestException(
          `Vui lòng đăng nhập bằng facebook, để cập nhật mật khẩu mới`
        );
      }
      if (userExists.goole_id) {
        throw new BadRequestException(
          `Vui lòng đăng nhập bằng google, để cập nhật mật khẩu mới`
        );
      }
      throw new BadRequestException(
        `Không hợp lệ, vui lòng liên hệ chăm sóc khách hàng`
      );
    }
    // so sánh password
    const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word);

    if (!isPassword) {
      throw new BadRequestException(`Mật khẩu không chính xác`);
    }

    const tokens = authService.createTokens(userExists.user_id);
    return tokens;
  },

  facebookLogin: async (req) => {
    console.log(req.body);
    const { name, email, picture, id } = req.body;
    const avatar = picture.data.url;
    let userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      userExists = await prisma.users.create({
        data: {
          email: email,
          full_name: name,
          face_app_id: id,
        },
      });
    }
    const tokens = authService.createTokens(userExists.user_id);
    console.log({ login_FaceBook: tokens });
    return tokens;
  },
  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new Unauthorization(`Vui lòng cung cấp token để tiếp tục sử dụng`);
    }
    const accessToken = req.headers[`x-access-token`];
    if (!accessToken) {
      throw new Unauthorization(`Vui lòng cung cấp token để tiếp tục sử dụng`);
    }
    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });
    if (decodeRefreshToken.userId !== decodeRefreshToken.userId) {
      throw new Unauthorization(`Cặp Token không hợp lệ`);
    }
    const userExists = await prisma.users.findUnique({
      where: {
        user_id: decodeRefreshToken.userId,
      },
    });

    if (!userExists) throw new Unauthorization(`User không tồn tại`);
    const tokens = authService.createTokens(userExists.user_id);

    console.log(decodeRefreshToken.userId);
    console.log(decodeAccessToken.userId);
    console.log({ headers: req.headers });
    return tokens;
  },
  getInfo: async (req) => {
    delete req.user.pass_word;
    return req.user;
  },
  // dành cho helper
  createTokens: (userId) => {
    if (userId) {
      const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRED,
      }); //payload: mã hóa, // secetOrPrivate : khóa bí mật, expiresIn hạn sử dụng
      const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRED,
      });
      return { accessToken: accessToken, refreshToken: refreshToken };
    } else {
      throw new BadRequestException(`Không có userId để tạo token`);
    }
  },
};

export default authService;
