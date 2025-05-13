import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../constant/app.constant";
import initModels from "../../models/init-models";

// SEQUELIZE
const sequelize = new Sequelize(DATABASE_URL, { logging: true });
export const models = initModels(sequelize);

try {
   await sequelize.authenticate();
   console.log("SEQUELIZE::Connection has been established successfully.");
} catch (error) {
   console.error("SEQUELIZE::Unable to connect to the database:", error);
}

export default sequelize;
