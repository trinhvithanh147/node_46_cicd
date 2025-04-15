import express from "express";
import { handleError } from "./src/common/helpers/erorr.helper.js";
import rootRouter from "./src/routes/root.router.js";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import prisma from "./src/common/prisma/init.prisma.js";
import initSocket from "./src/socket/init.socket.js";
//Alt+Shift+ O để loại bỏ những import không dùng tới
// Ctrl + Shift + P reload lại visual
const app = express(); //chứa key và function

//middleware giúp phân giải dữ liệu từ json sang đối tượng js
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.static("."));
// --------------------------------------------------------------------
app.use(rootRouter);

/**
 * https://jwt.io/ gia hạn token
 */
/**
 * npm i bcrypt mã hóa dữ liệu
 */
/**
 * Code first
 * đi từ code tạo ra db
 */

//Tạo ra model từ defind

/**
 * Database first
 * đi từ câu lệnh sql để tạo ra db
 * - sequelize-auto
 * - npm i sequelize-auto
 */
// const models = initModels(sequelize);
// app.get(`/video-list`, async (req, res, next) => {
//   const videos = await models.videos.findAll({ raw: true });
//   res.json(videos);
// });

app.use(handleError);
const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(3069, () => {
  console.log(`Server Online At Port 3069`);
});

// console.log(process.env);
/**
 * Tự động lưu token ở PostMAN
 * const response = pm.response.json()

if(response.status === error) return

const accessToken = response.metaData.accessToken
const refreshToken = response.metaData.refreshToken

pm.globals.set("accessToken", accessToken);
pm.globals.set("refreshToken", refreshToken);
 * 
 */
/**
 * PRISMA
 *  -npm i prisma
 *  -npm i @prisma/client
 *  -npx prisma init: khởi tạo prisma
 *      - tạo ra .env
 *      - tạo ra prisma/schema.prisma
 *  - npx prisma db pull
 *  -npx prisma generate
 * **** Cập nhật lại DB
 * prisma: chỉ cần chạy 2 câu lệnh sau:
 *  - npx prisma db pull
 *  - npx prisma generate
 *
 *  sequelize:
 *    npx sequelize-auto -h localhost -d db_cyber_media -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm
 *
 */
// app.use(
//   (req, res, next) => {
//     console.log("middleware 1");
//     const payload = `payload`;
//     res.payload = payload;
//     next(123);
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     console.log(res.payload);
//     next();
//   },
//   (req, res, next) => {
//     console.log(`middleware 3`);
//     next();
//   },

// );

// /**
//  * Query Parameters
//  * Thường dùng: khi muốn phân trang, search, filter
//  */
// app.get(`/query`, (request, response, next) => {
//   console.log(request.query);
//   const { email, password } = request.query; //distructuring
//   console.log(email, password);
//   response.json(`Query Parameters`);
// });

// /**
//  * Path Parameters
//  * Thường dùng: khi muốn lấy chi tiết (detail) của một user, product, ...
//  */

// app.get(`/path/:id`, (request, response, next) => {
//   console.log(request.params);
//   response.json(`Path Parameters`);
// });

// /**
//  * Headers Parameters
//  */
// app.get(`/headers`, (request, response, next) => {
//   console.log(request.headers);
//   response.json(`Headers`);
// });

// /**
//  * Body
//  * để nhận được dữ liệu từ body bắt buộc phải có
//  * - app.use(express.json());
//  * - hoặc sử dụng thư viện parser: https://www.npmjs.com/package/parser
//  */
// app.post(`/body`, (request, response, next) => {
//   console.log(request.body);
//   response.json(`Body Parameters`);
// });

/**
 // BE - ExpressJS CURD
    // Routes
    "Express CRUD Routes": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-router-crud",
      "body": [
          "import express from 'express';",
          "",
          "const ${1:module}Router = express.Router();",
          "",
          "// Tạo route CRUD",
          "${1:module}Router.post('/', ${1:module}Controller.create);",
          "${1:module}Router.get('/', ${1:module}Controller.findAll);",
          "${1:module}Router.get('/:id', ${1:module}Controller.findOne);",
          "${1:module}Router.patch('/:id', ${1:module}Controller.update);",
          "${1:module}Router.delete('/:id', ${1:module}Controller.remove);",
          "",
          "export default ${1:module}Router;"
      ],
      "description": "Snippet for Express CRUD routes"
  },
  "Express CRUD Controller": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-controller-crud",
      "body": [
          "export const ${1:module}Controller = {",
          "   create: async function (req, res, next) {",
          "      try {",
          "         const result = await ${2:${1:module}Service}.create(req);",
          "         const response = ${3:responseSuccess}(result, `Create ${1:module} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   findAll: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.findAll(req);",
          "         const response = responseSuccess(result, `Get all ${1:module}s successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   findOne: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.findOne(req);",
          "         const response = responseSuccess(result, `Get ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   update: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.update(req);",
          "         const response = responseSuccess(result, `Update ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   remove: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.remove(req);",
          "         const response = responseSuccess(result, `Remove ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   }",
          "};"
      ],
      "description": "Snippet for Express CRUD controller"
  },
  "Express CRUD Service": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-service-crud",
      "body": [
          "export const ${1:module}Service = {",
          "   create: async function (req) {",
          "      return `This action create`;",
          "   },",
          "",
          "   findAll: async function (req) {",
          "      return `This action returns all ${1:module}`;",
          "   },",
          "",
          "   findOne: async function (req) {",
          "      return `This action returns a id: ${req.params.id} ${1:module}`;",
          "   },",
          "",
          "   update: async function (req) {",
          "      return `This action updates a id: ${req.params.id} ${1:module}`;",
          "   },",
          "",
          "   remove: async function (req) {",
          "      return `This action removes a id: ${req.params.id} ${1:module}`;",
          "   },",
          "};"
      ],
      "description": "Snippet for Express CRUD service"
  }

 */
