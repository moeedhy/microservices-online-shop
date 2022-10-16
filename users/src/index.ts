import { app } from "./app";

import { database } from "./helpers/database";

const start = async () => {
  if (!process.env.POSTGRES_URI) throw new Error("database parameters not set");
  if (!process.env.JWT_KEY) throw new Error("JWT key not setup");
  try {
    await database.sync();
    console.log("Connection has been established successfully.");
    app.listen(3000, () => console.log("users service running on 3000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
start();
