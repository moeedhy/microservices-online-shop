import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "test") dotenv.config();
const sequeliez = new Sequelize(process.env.POSTGRES_URI!);

export { sequeliez as database };
