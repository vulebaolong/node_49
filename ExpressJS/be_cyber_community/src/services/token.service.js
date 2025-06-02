import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";

const tokenService = {
   createTokens: (userId) => {
      if (!userId) {
         throw new Error("Không có userId để tạo token");
      }

      const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
      const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });

      return {
         accessToken: accessToken,
         refreshToken: refreshToken,
      };
   },
   verifyAccessToken: (token, ignoreExpiration = false) => {
      return jwt.verify(token, ACCESS_TOKEN_SECRET, { ignoreExpiration: ignoreExpiration });
   },
   verifyRefreshToken: (token) => {
      return jwt.verify(token, REFRESH_TOKEN_SECRET);
   },
};

export default tokenService;
