import { responseError } from "./response.helper";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper";
import multer from "multer";

export const handleError = (err, req, res, next) => {
   console.log(`Middleware ERROR ĐẶC BIỆT`, err);

   // (new Error()).

   if (err instanceof jwt.JsonWebTokenError) {
      console.log("Token không hợp lệ");
      err.code = statusCodes.UNAUTHORIZED;
   }

   if (err instanceof jwt.TokenExpiredError) {
      console.log("Token hết hạn");
      err.code = statusCodes.FORBIDDEN;
   }

   if(err instanceof multer.MulterError) {
      console.log("Multer Error", multer.MulterError.name);
      err.code =  statusCodes.BAD_REQUEST
   }

   // const resData = responseError(err?.message, err?.code, isProduction === "true"? null : err?.stack)
   const resData = responseError(err?.message, err?.code, err?.stack);
   res.status(resData.statusCode).json(resData);
};
