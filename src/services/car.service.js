import Cars from "../models/Cars.mode.js";

const carService = {
  carList: async (req) => {
    const { page } = req.query;
    console.log(page);
    //Lỗi kiểm soát được
    //400,403,401
    // const passNguoiDungGuiLen = 123;
    // const passLayTrongDb = 1235;

    // if (passLayTrongDb !== passNguoiDungGuiLen) {
    //   throw new BadRequestException(`Mật khẩu không chính xác`); // throw ii chang return
    // }
    // if (true) {
    //   throw new BadRequestException("email không hợp lệ");
    // }

    // Lỗi không tìm kiểm soát được
    //mã code: 500
    // console.log(abc);
    const cars = await Cars.findAll({ raw: true });
    return cars;
  },
};

export default carService;
