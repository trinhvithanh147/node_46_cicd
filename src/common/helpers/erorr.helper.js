import multer from "multer";
import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
export const handleError = (err, req, res, next) => {
  console.log(err);

  // 401: logout
  //403: refreshToken
  // 2 mã này sẽ do FE và BE tự quy định với nhau
  if (err instanceof jwt.JsonWebTokenError) {
    err.code = 401; //token không hợp lệ
  }
  if (err instanceof jwt.TokenExpiredError) {
    err.code = 403; //token hết hạn
  } // instanceof dùng để kiểm tra xem một đối tượng có thuộc về một lớp (class) hoặc constructor function nào đó không.
  if (err instanceof multer.MulterError) {
    err.code = 400;
  }
  const resData = responseError(err.message, err.code, err.stack);
  res.status(resData.code).json(resData);
};

// Gọi Error(message), lấy `message` từ Error ra
/**
     * 📌 Vậy, sau khi gọi super(message), đối tượng lỗi có các thuộc tính sau:
    ✔   name (tên lỗi, mặc định "Error", nhưng có thể tự đặt).
    ✔ message (nội dung lỗi).
    ✔ stack (ngăn xếp lỗi).
    ✔ code (thuộc tính ta tự thêm).
     */

export class BadRequestException extends Error {
  constructor(message = `BadRequestException`) {
    super(message);
    this.code = 400; // this ở đây là BadRequestException bởi vì nó đã được kế thừa thuộc tính và phương thức của Error
  }
}

export class ForbiddenException extends Error {
  constructor(message = `ForbiddenException`) {
    super(message);
    this.code = 403;
  }
}
export class Unauthorization extends Error {
  constructor(message = `Unauthorization`) {
    super(message);
    this.code = 401;
  }
}
