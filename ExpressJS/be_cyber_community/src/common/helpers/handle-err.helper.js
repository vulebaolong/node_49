import { responseError } from "./response.helper";

export const handleError = (err, req, res, next) => {
   console.log(`Middleware ERROR ĐẶC BIỆT`, err);

   // (new Error()).

   // const resData = responseError(err?.message, err?.code, isProduction === "true"? null : err?.stack)
   const resData = responseError(err?.message, err?.code, err?.stack)
   res.status(resData.statusCode).json(resData);
};
