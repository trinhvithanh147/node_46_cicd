import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js";
import prisma from "../prisma/init.prisma.js";
import { Unauthorization } from "../helpers/erorr.helper.js";

export const protect = async (req, res, next) => {
  console.log({ protect_token: req.headers });
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new Unauthorization(`Vui lòng cung cấp token để tiếp tục sử dụng`);
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: {
        user_id: decode.userId,
      },
      include: {
        roles: true,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
