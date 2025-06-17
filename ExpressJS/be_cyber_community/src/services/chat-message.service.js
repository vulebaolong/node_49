import prisma from "../common/prisma/init.prisma";

export const chatMessageService = {
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
         if (key === `createdAt`) {
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
         ChatGroups: {
            ChatGroupMembers: {
               some: {
                  userId: req.user.id,
               },
            },
         },
      };
      console.log("Mong muốn \t", where);
      console.log("\n");

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;

      const chatMessages = await prisma.chatMessages.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
         where: where,
      });

      const totalItem = await prisma.chatMessages.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: chatMessages,
      };
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} chatMessage`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} chatMessage`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} chatMessage`;
   },
};
