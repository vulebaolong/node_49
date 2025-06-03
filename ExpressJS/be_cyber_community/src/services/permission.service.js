import prisma from "../common/prisma/init.prisma";

export const permissionService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all permission`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission`;
   },

   groupByModule: async function (req) {
      const permissions = await prisma.permissions.findMany({
         include: {
            RolePermission: {
               where: {
                  isActive: true,
               },
            },
         },
      });
      const obj = {
         Article: [],
         Role: [],
      };
      const result = {};

      permissions.forEach((permission) => {
         permission.isActive = permission?.RolePermission.length > 0
         if (Array.isArray(result[permission.module])) {
            result[permission.module].push(permission);
         } else {
            result[permission.module] = [];
            result[permission.module].push(permission);
         }
      });

      return result;
   },
};
