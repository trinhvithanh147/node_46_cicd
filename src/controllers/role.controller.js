import { responseSuccess } from "../common/helpers/response.helper.js";
import { roleService } from "../services/role.service.js";

export const roleController = {
  create: async function (req, res, next) {
    try {
      const result = await roleService.create(req);
      const response = responseSuccess(
        result,
        `Create roleController successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await roleService.findAll(req);
      const response = responseSuccess(
        result,
        `Get all roleControllers successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await roleService.findOne(req);
      const response = responseSuccess(
        result,
        `Get roleController #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await roleService.update(req);
      const response = responseSuccess(
        result,
        `Update roleController #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await roleService.remove(req);
      const response = responseSuccess(
        result,
        `Remove roleController #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  togglePermission: async function (req, res, next) {
    try {
      const result = await roleService.togglePermission(req);
      const response = responseSuccess(
        result,
        `Toggle Permission successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
