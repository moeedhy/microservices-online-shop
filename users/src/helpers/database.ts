import { Sequelize } from "sequelize";

const sequeliez = new Sequelize(process.env.POSTGRES_URI!);

export { sequeliez as database };
