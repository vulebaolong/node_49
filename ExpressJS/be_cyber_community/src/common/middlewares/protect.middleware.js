import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import { UnauthorizedException } from "../helpers/exception.helper";
import tokenService from "../../services/token.service";
import prisma from "../prisma/init.prisma";

const protect = async (req, res, next) => {
   req.isProtect = true;

   const authHeader = req.headers?.authorization || "";
   const [type, token] = authHeader.split(" ");
   if (!token) {
      throw new UnauthorizedException("Không có token");
   }
   if (type !== `Bearer`) {
      throw new UnauthorizedException("Kiểu token không hợp lệ");
   }

   // kiểm tra token
   // nếu chạy qua là token hợp lệ, và trả về payload
   // nếu có lỗi thì tự động throw lỗi (jwt.verify), chúng ta không cần throw
   console.log({ token });
   const decode = tokenService.verifyAccessToken(token);

   const user = await prisma.users.findUnique({
      where: {
         id: decode.userId,
      },
      include: {
         Roles: true
      }
   });

   req.user = user;

   console.log({
      token,
      type,
      decode,
      user,
   });

   next();
};

export default protect;
