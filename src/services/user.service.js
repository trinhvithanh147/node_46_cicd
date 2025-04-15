import { BadRequestException } from "../common/helpers/erorr.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { v2 as cloudinary } from "cloudinary";
export const userService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all user`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} user`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} user`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} user`;
  },
  uploadLocal: async (req) => {
    console.log({ file: req.file });
    const file = req.file;
    if (!file) {
      throw new BadRequestException(
        `Vui Lòng gửi hình ảnh lên thông qua key file(form-data)`
      );
    }
    const userId = req.user.user_id;
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: file.filename,
      },
    });
    return {
      folder: "images/",
      filename: file.filename,
      imgUrl: `images/${file.path}`,
    };
  },
  uploadCloud: async (req) => {
    console.log({ file: req.file });
    const file = req.file;
    if (!file) {
      throw new BadRequestException(
        `Vui Lòng gửi hình ảnh lên thông qua key file(form-data)`
      );
    }
    const userId = req.user.user_id;
    // Configuration
    cloudinary.config({
      cloud_name: "duepu8vku",
      api_key: "352961886381232",
      api_secret: "sEIygQLboyIW79gHQmVny5rgVaQ", // Click 'View API Keys' above to copy your API secret
    });
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({ folder: "images" }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });

    console.log({ uploadResult });
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: uploadResult.secure_url,
      },
    });
    // Để cho FE show được hình cần đổi tên: `https://res.cloudinary.com/<Tên của bạn>/image/upload/`
    // src/constant/app.constant.ts
    // export const BASE_DOMAIN_CLOUDINARY = `https://res.cloudinary.com/duepu8vku/image/upload/`
    return {
      folder: uploadResult.asset_folder,
      filename: file.original_filename,
      imgUrl: uploadResult.secure_url,
    };
  },
};
