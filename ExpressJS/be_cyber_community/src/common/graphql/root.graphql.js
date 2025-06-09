import tokenService from "../../services/token.service";
import { BadrequestException } from "../helpers/exception.helper";
import sendMail from "../nodemailer/init.nodemailer";
import prisma from "../prisma/init.prisma";
import bcrypt from "bcrypt";

// The root provides a resolver function for each API endpoint
const root = {
   hello() {
      return "Hello world!";
   },
   async getListArticle(args, context, info) {
      if (!context?.user) {
         throw new BadrequestException("Chua dang nhap");
      }

      let { page, pageSize, filters = {} } = args;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      // filters = JSON.parse(filters || `{}`);

      // console.log(Object.entries(filters1));
      Object.entries(filters).forEach(([key, value], i, arr) => {
         console.log(key, value);
         if (value === "" || value === null || value === undefined) {
            delete filters[key];
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

      const articles = await prisma.articles.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
         where: where,
      });

      const totalItem = await prisma.articles.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: articles,
      };
   },
   async login(args, context, info) {
      const { email, password } = args;

      const userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });

      if (!userExist) {
         // trả lỗi
         throw new BadrequestException("Người dùng chưa tồn tại xin vui lòng đăng ký");
         // throw new BadrequestException("Tài khoản không hợp");
      }

      const isPassword = bcrypt.compareSync(password, userExist.password);
      if (!isPassword) {
         throw new BadrequestException("Mật khẩu không chính xác");
         // throw new BadrequestException("Tài khoản không hợp");
      }

      // token: access-token | refresh-token
      const tokens = tokenService.createTokens(userExist.id);

      // sendMail(userExist.email)
      sendMail("vulebaolong@gmail.com");

      return tokens;
   },
};

export default root;
