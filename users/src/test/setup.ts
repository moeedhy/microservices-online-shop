import { Client } from "pg";

import { database } from "../helpers/database";
import * as dotenv from "dotenv";
import User from "../models/user";
dotenv.config();
// const client = new Client({
//   host: "127.0.0.1",
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: 5432,
// });

beforeAll(async () => {
  if (!process.env.POSTGRES_URI) throw new Error("Postgres uri not found");
  if (!process.env.JWT_KEY) throw new Error("JWT key not found");

  try {
    // await client.connect();
    // await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    await database.sync();
  } catch (e) {
    console.log(e);
  }
});

beforeEach(async () => {
  try {
    await User.destroy();
  } catch (e) {
    console.log(e);
  }
});

afterAll(async () => {
  try {
    // await client.query("DROP DATABASE users_test");
    // await client.end();
    await database.drop();
    await database.close();
  } catch (e) {
    console.log(e);
  }
});
