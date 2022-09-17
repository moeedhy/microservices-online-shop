import { app } from "./app";
import * as dotenv from "dotenv";
import { database } from "./helpers/database";
dotenv.config({ path: "./.env" });

if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.SECRET_KEY ||
  !process.env.JWT_SECRET
)
  throw new Error("please set parameters on .env file");
const start = async () => {
  try {
    await database.drop();
    await database.sync();
    console.log("Connection has been established successfully.");
    app.listen(3000, () => console.log("users service running on 3000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
start();
