import { responseSuccess } from "../common/helpers/response.helper";
import demoService from "../services/demo.service";

const demoController = {
   helloWorld: (req, res, next) => {
      // gọi tới service
      const reuslt = demoService.helloWorld();
      res.json(reuslt);
   },
   query: (req, res, next) => {
      const result = demoService.query(req);
      res.json(result);
   },
   params: (req, res, next) => {
      const result = demoService.params(req);
      res.json(result);
   },
   headers: (req, res, next) => {
      const result = demoService.headers(req);
      res.json(result);
   },
   body: (req, res, next) => {
      const result = demoService.body(req);
      res.json(result);
   },
   mysql2: async (req, res, next) => {
      // 200: thành công
      // 400, 500: lỗi
      // 401: logout
      // 403: refresh token
      const result = await demoService.mysql2(req);
      const resData = responseSuccess(result, "Gọi API Mysql2 thành công");
      res.status(resData.statusCode).json(resData);
   },
   sequelize: async (req, res, next) => {
      try {
         console.log(req.long, res.long);
         const result = await demoService.sequelize();
         const resData = responseSuccess(result, "Gọi API sequelize thành công");
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         console.log({ error: error.message });
         next(error);
      }
   },
};

export default demoController;
