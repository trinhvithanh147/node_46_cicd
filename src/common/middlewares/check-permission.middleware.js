import { BadRequestException } from "../helpers/erorr.helper.js";
import prisma from "../prisma/init.prisma.js";

export const checkPermission = async (req, res, next) => {
  try {
    // Gom dữ liệu cần thiết để kiểm tra permission
    console.log(`day-ne:`, req.user);
    const user = req.user;

    console.log(req.url);
    const baseUrl = req.baseUrl;
    console.log({ baseURL: baseUrl });

    const routePath = req.route.path;
    console.log({ routePath: routePath });
    const fullPath = baseUrl + routePath;
    // `${baseUrl}${routePath}`;
    console.log({ fullPath: fullPath });
    const method = req.method;
    console.log({ method });
    // nếu là ADMIN (role_id === 1) thì cho qua
    // bắt buộc phải có return, nếu không code sẽ chạy tiếp tục
    const role_id = user.role_id;
    if (role_id === 1) return next();
    // Đi tìm id của permission thông qua fullPath, method
    const permission = await prisma.permissions.findFirst({
      where: {
        endpoint: fullPath,
        method: method,
      },
    });
    console.log({ permission });
    const role_permission = await prisma.role_permissions.findFirst({
      where: {
        permission_id: permission.permission_id,
        role_id: role_id,
        is_active: true,
      },
    });
    console.log({ role_permission });
    if (!role_permission) {
      throw new BadRequestException(
        `Bạn không đủ quyền sử dụng tài nguyên (API) này  `
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
