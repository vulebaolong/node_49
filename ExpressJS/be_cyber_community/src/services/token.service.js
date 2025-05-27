import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET } from "../common/constant/app.constant";

const tokenService = {
   createTokens: (userId) => {
      const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
      return {
         accessToken: accessToken,
         refreshToken: "123",
      };
   },
   verifyAccessToken: (token) => {
      return jwt.verify(token, ACCESS_TOKEN_SECRET);
   },
};

export default tokenService;
