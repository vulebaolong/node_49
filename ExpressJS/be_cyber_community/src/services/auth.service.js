import { BadrequestException, UnauthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../common/constant/app.constant";
import jwt from "jsonwebtoken";
import sendMail from "../common/nodemailer/init.nodemailer";

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

      console.log({ userNew });

      // delete userNew.password;

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

      // sendMail(userExist.email)
      sendMail("vulebaolong@gmail.com");

      return tokens;
   },
   getInfo: async (req) => {
      delete req.user.password;
      return req.user;
   },
   googleLogin: async (req) => {
      const { code } = req.body;

      const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "postmessage");

      // Nếu vượt qua được dòng code này => google đã xác minh cho mình người dùng này hợp lệ
      const { tokens: tokensGoogle } = await oAuth2Client.getToken(code);

      const decode = jwt.decode(tokensGoogle.id_token);

      console.log({ code, id_token: tokensGoogle.id_token, decode });

      const { email, email_verified, name, picture } = decode;

      if (!email_verified) throw new BadrequestException("Email chưa được xác thực");

      let userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });

      if (!userExist) {
         userExist = await prisma.users.create({
            data: {
               email: email,
               fullName: name,
               avatar: picture,
               googleId: decode.sub
            },
         });
      }

      console.log({ userExist });

      const tokens = tokenService.createTokens(userExist.id);

      console.log({ tokens });

      return tokens;
   },
   refreshToken: async (req) => {
      const { accessToken, refreshToken } = req.body;

      const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
      const decodeAccessToken = tokenService.verifyAccessToken(accessToken, true);

      if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
         throw new UnauthorizedException("Refresh Token không thành công");
      }
      const tokens = tokenService.createTokens(decodeRefreshToken.userId);

      return tokens;
   },
};

export default authService;
