import { Sequelize } from "sequelize";

const sequeliez = new Sequelize("user", "postgres", "5744858", {
  host: "localhost",
  dialect: "postgres",
});

export { sequeliez as database };
