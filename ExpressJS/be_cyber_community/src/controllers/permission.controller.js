import { responseSuccess } from "../common/helpers/response.helper";
import { permissionService } from "../services/permission.service";

export const permissionController = {
   create: async function (req, res, next) {
      const result = await permissionService.create(req);
      const response = responseSuccess(result, `Create permission successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await permissionService.findAll(req);
      const response = responseSuccess(result, `Get all permissions successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await permissionService.findOne(req);
      const response = responseSuccess(result, `Get permission #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await permissionService.update(req);
      const response = responseSuccess(result, `Update permission #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await permissionService.remove(req);
      const response = responseSuccess(result, `Remove permission #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   groupByModule: async function (req, res, next) {
      const result = await permissionService.groupByModule(req);
      const response = responseSuccess(result, `Remove permission #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};