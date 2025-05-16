import pool from "../common/mysql2/init.mysql2";
import { models } from "../common/sequelize/init.sequelize";
import Roles from "../models/Roles-by-myself";

const demoService = {
   helloWorld: () => {
      return `hello world`;
   },
   query: (req) => {
      const query = req.query;

      console.log(query);

      return query;
   },
   params: (req) => {
      const params = req.params;

      console.log(params);

      return params;
   },
   headers: (req) => {
      const headers = req.headers;

      console.log(headers);

      return headers;
   },
   body: (req) => {
      const body = req.body;

      console.log(body);

      return body;
   },
   mysql2: async () => {
      const [rows, fields] = await pool.query("SELECT * FROM Roles");

      return rows;
   },
   sequelize: async () => {
      // Lỗi không kiểm soát được
      // console.log(abc);

      // Lỗi kiểm soát được
      const passUser = "123"
      const passDB = "1234"
      if(passUser !== passDB) {
         BadrequestException
         throw new Error("Pass sai") 
      }

      const listRole1 = await Roles.findAll();

      const listRole2 = await models.Roles.findAll();

      const result = {
         "Model tự tạo": listRole1,
         "Model do sequelize-auto tạo ra": listRole2,
      };

      return result;
   },
};

export default demoService;
