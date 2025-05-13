import { DataTypes } from "sequelize";
import sequelize from "../common/sequelize/init.sequelize";

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
// npm i sequelize-auto
// npx sequelize-auto -h localhost -d db_cyber_community -u root -x 1234 -p 3307  --dialect mysql -o ./models -l esm -a ./additional.json

export default Roles;