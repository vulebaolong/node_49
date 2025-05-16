import { responseError } from "./response.helper";

export const handleError = (err, req, res, next) => {
   console.log(`Middleware ERROR ĐẶC BIỆT`, err);

   // (new Error()).

   const resData = responseError(err?.message, 400, err?.stack)
   res.status(resData.statusCode).json(resData);
};
