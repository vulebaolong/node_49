import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import path from "path";
import fs from "fs";
import cloudinary from "../common/cloudinary/init.cloudinary";

export const userService = {
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

      const users = await prisma.users.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
         where: where,
      });

      const totalItem = await prisma.users.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: users,
      };
   },

   findOne: async function (req) {
      const user = await prisma.users.findUnique({
         where: {
            id: Number(req.params.id),
         },
         omit: {
            password: true,
         },
         include: {
            Roles: true,
         },
      });
      return user;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} user`;
   },

   avatarLocal: async function (req) {
      console.log(req.file);
      const file = req.file;
      if (!file) {
         throw new BadrequestException("Chưa tìm thấy file");
      }

      const user = req.user;

      // Đảm bảo 1 user chỉ có 1 avatar

      try {
         await prisma.users.update({
            where: {
               id: Number(user.id),
            },
            data: {
               avatar: file.filename,
            },
         });

         if (user.avatar) {
            // tạo ra đường dẫn đến file, tương thích với mọi hệ điều hành
            // win: \\
            // mac: //
            const oldFilePath = path.join("images", user.avatar);
            if (fs.existsSync(oldFilePath)) {
               fs.unlinkSync(oldFilePath);
            }
            cloudinary.uploader.destroy(user.avatar);
         }
      } catch (error) {
         console.log(error);
         throw new BadrequestException(error.message);
      }

      return {
         folder: "images/",
         filename: file.filename,
         imgUrl: `images/${file.filename}`,
      };
   },

   avatarCloud: async function (req) {
      console.log(req.file);
      const file = req.file;
      if (!file) {
         throw new BadrequestException("Chưa tìm thấy file");
      }

      const user = req.user;

      const uploadResult = await new Promise((resolve) => {
         cloudinary.uploader
            .upload_stream({ folder: "images" }, (error, uploadResult) => {
               return resolve(uploadResult);
            })
            .end(file.buffer);
      });

      console.log({ uploadResult });

      try {
         await prisma.users.update({
            where: {
               id: Number(user.id),
            },
            data: {
               avatar: uploadResult.public_id,
            },
         });

         if (user.avatar) {
            // tạo ra đường dẫn đến file, tương thích với mọi hệ điều hành
            // win: \\
            // mac: //
            const oldFilePath = path.join("images", user.avatar);
            if (fs.existsSync(oldFilePath)) {
               fs.unlinkSync(oldFilePath);
            }
            cloudinary.uploader.destroy(user.avatar);
         }
      } catch (error) {
         console.log(error);
         throw new BadrequestException(error.message);
      }

      return {
         folder: uploadResult.folder,
         filename: file.originalname,
         imgUrl: uploadResult.secure_url,
      };
   },
};
