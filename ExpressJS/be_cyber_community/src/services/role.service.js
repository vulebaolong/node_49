import prisma from "../common/prisma/init.prisma";

export const roleService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async (req) => {
      let { page, pageSize, filters } = req.query;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      filters = JSON.parse(filters || `{}`);

      // console.log(Object.entries(filters1));
      Object.entries(filters).forEach(([key, value], i, arr) => {
         console.log(key, value);
         if (value === "" || value === null || value === undefined) {
            delete filters[key];
            return;
         }
         if (key === "id") {
            filters[key] = +value;
            return;
         }
         if (!isNaN(new Date(value)) || key === `createdAt`) {
            const startDate = new Date(value); //15/05/2022
            const endDate = new Date(startDate); //15/05/2022
            endDate.setDate(endDate.getDate() + 1); // 15 + 1 = 16 => 16/05/2022

            filters[key] = {
               gte: startDate,
               lte: endDate,
            };

            return;
         }
         if (typeof value === "string") {
            filters[key] = { contains: value };
         }
      });

      console.log("\n");
      console.log("Xử lý \t\t", filters);

      const where = {
         ...filters,
      };
      console.log("Mong muốn \t", where);
      console.log("\n");

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;

      const roles = await prisma.roles.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
         where: where,
      });

      const totalItem = await prisma.roles.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: roles,
      };
   },

   findOne: async function (req) {
      const roleId = req.params.id;

      const role = await prisma.roles.findUnique({
         where: {
            id: +roleId,
         },
      });

      return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async function (req) {
      const { roleId, permissionId } = req.body;
      console.log({ roleId, permissionId });

      const rolePermissionExist = await prisma.rolePermission.findFirst({
         where: {
            roleId: roleId,
            permissionId: permissionId,
         },
      });

      if (rolePermissionExist) {
         await prisma.rolePermission.update({
            where: {
               id: rolePermissionExist.id,
            },
            data: {
               isActive: !rolePermissionExist.isActive,
            },
         });
      } else {
         await prisma.rolePermission.create({
            data: {
               roleId: roleId,
               permissionId: permissionId,
               isActive: true,
            },
         });
      }

      return true;
   },
};
