import prisma from "../common/prisma/init.prisma.js";
import _ from "lodash";
export const permissionService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all module`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} module`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} module`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} module`;
  },
  groupByModule: async function (req) {
    const { id } = req.params;

    // lấy ra tất cả các permission từ bảng "role_permission"
    const permission = await prisma.permissions.findMany({
      include: {
        role_permissions: {
          where: {
            role_id: +id,
            is_active: true,
          },
        },
      },
    });
    return _.groupBy(permission, "module");
  },
};
