import multer from "multer";
import path from "path";
//Nơi lưu trữ(lưu pixcel data hình ảnh), Xử lý tên file và đuôi mở rộng (extension)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // có req  và file để xử lý logic tạo ra folder muốn lưu trữ(file: image,docx,excel,pdf, ...)
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //fileExtension (đuôi mở rộng của file)
    const fileExtension = path.extname(file.originalname);
    // const fileNameString = `local- ${file.fieldname}-` + "-" + uniqueSuffix + fileExtension;
    const fileNameString = `local- ${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileNameString);
  },
});

const uploadLocal = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});
export default uploadLocal;
