import { responseSuccess } from "../common/helpers/response.helper";
import articleService from "../services/article.service";

const articleController = {
   findAll: async (req, res, next) => {
      const result = await articleService.findAll(req);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
   },
};

export default articleController;
