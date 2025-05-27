import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../common/constant/app.constant";
import jwt from "jsonwebtoken";

const authService = {
   register: async (req) => {
      const { email, password, fullName } = req.body;

      // Tìm kiếm email đã tồn tại hay chưa
      const userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });
      console.log(`userExist`, userExist);

      if (userExist) {
         throw new BadrequestException("Tài khoản đã tồn tại vui lòng đăng nhập");
      }

      // Mã hoá password (băm | hashing)
      const passwordHash = bcrypt.hashSync(password, 10);

      const userNew = await prisma.users.create({
         data: {
            email: email,
            password: passwordHash,
            fullName: fullName,
         },
      });

      delete userNew.password;

      return userNew;
   },
   login: async (req) => {
      const { email, password } = req.body;

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

      return tokens;
   },
   getInfo: async (req) => {
      delete req.user.password;
      return req.user;
   },
   googleLogin: async (req) => {
      const { code } = req.body;

      const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "postmessage");

      const { tokens } = await oAuth2Client.getToken(code);

      const decode = jwt.decode(tokens.id_token);

      console.log({ code, id_token: tokens.id_token, decode });

      return `googleLogin`;
   },
};

export default authService;
