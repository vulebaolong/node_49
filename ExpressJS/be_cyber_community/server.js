import express from "express";
import mysql from "mysql2/promise";
import { DataTypes, Sequelize } from "sequelize";
import initModels from "./src/models/init-models";

const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res, next) => {
   res.json("hello world");
});

// 4 cách nhận dữ liệu từ FE (hê thống khác)
// Query
// Cách nhận biết: bắt đầu bằng dấu chẩm hỏi (?), phân tách biến bằng dấu và (&)
// Thường sử dụng: phân trang, lọc, tim kiếm
app.get("/query", (req, res, next) => {
   const query = req.query;

   console.log(query);

   res.json(query);
});

// Params
// Cách nhận biết: bắt đầu bằng dấu sẹc (/:id)
// Thường sử dụng: để lấy thông tin chi tiết của một item (detail)
app.get("/params/:id", (req, res, next) => {
   const params = req.params;

   console.log(params);

   res.json(params);
});

// headers
// Thường sử dụng: token, x-api-key
app.delete("/headers", (req, res, next) => {
   const headers = req.headers;

   console.log(headers);

   res.json(headers);
});

// body
// sẽ cần middleware: express.json() để chuyển từ dữ liệu JSON => JAVASCRIPT
// Thường sử dụng: khi tạo mới, dữ liệu gửi lên nhiều
app.post("/body", (req, res, next) => {
   const body = req.body;

   console.log(body);

   res.json(body);
});

const DATABASE_URL = `mysql://root:1234@localhost:3307/db_cyber_community`;

// MYSQL2
const pool = mysql.createPool({ uri: DATABASE_URL });
try {
   await pool.query("SELECT 1+1 AS result");
   console.log("MYSQL2::Connection has been established successfully.");
} catch (error) {
   console.error("MYSQL2::Unable to connect to the database:", error);
}

app.get("/mysql2", async (req, res, next) => {
   const [rows, fields] = await pool.query("SELECT * FROM Roles");

   res.json(rows);
});

// SEQUELIZE
const sequelize = new Sequelize(DATABASE_URL, { logging: true });

try {
   await sequelize.authenticate();
   console.log("SEQUELIZE::Connection has been established successfully.");
} catch (error) {
   console.error("SEQUELIZE::Unable to connect to the database:", error);
}

// model
const Roles = sequelize.define(
   // tên nội bộ của sequelize, thường được đùng cho Sequelize khi muốn truy xuất sequelize.model(Roles)
   "Roles",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      isActive: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
      },
      deletedBy: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      isDeleted: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: 0,
      },
      deletedAt: {
         type: "TIMESTAMP",
         allowNull: true,
      },
      createdAt: {
         type: "TIMESTAMP",
         allowNull: false,
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
         type: "TIMESTAMP",
         allowNull: false,
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
   },
   {
      // Tên table chính xác mà mình muốn bên trong db
      tableName: "Roles",
      timestamps: false,
   }
);

// CODE FIRST: code => db
// đồng bộ table vào bên trong db
Roles.sync();

// DATABASE FIRST: db => code
// npx sequelize-auto -h localhost -d db_cyber_community -u root -x 1234 -p 3307  --dialect mysql -o ./models -l esm -a ./additional.json

const models = initModels(sequelize);
app.get("/sequelize", async (req, res, next) => {
   const listRole1 = await Roles.findAll();

   const listRole2 = await models.Roles.findAll();

   const result = {
      "Model tự tạo": listRole1,
      "Model do sequelize-auto tạo ra": listRole2,
   };

   res.json(result);
});

app.listen(3069, () => {
   console.log(`Server running on port http://localhost:3069`);
});

/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: giúp kéo table vào trong code và tự tạo ra model (DATABASE FIRST),
 * extensionless: giúp import file mà không cần phải thêm đuôi js
 */
