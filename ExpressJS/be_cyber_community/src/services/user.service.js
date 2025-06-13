import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import path from "path";
import fs from "fs";
import cloudinary from "../common/cloudinary/init.cloudinary";

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
