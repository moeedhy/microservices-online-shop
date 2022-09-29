import {database} from "../helpers/database";
import * as dotenv from "dotenv";
import User from "../models/user";
import request from "supertest";
import {app} from "../app";

dotenv.config();

declare global {
  var signin: () => Promise<string[]>;
}
beforeAll(async () => {
  if (!process.env.POSTGRES_URI) throw new Error("Postgres uri not found");
  if (!process.env.JWT_KEY) throw new Error("JWT key not found");

  try {

    await database.sync({ logging: false });
  } catch (e) {
    console.log(e);
  }
});

beforeEach(async () => {
  try {
    await User.destroy({ truncate: true, logging: false });
  } catch (e) {
    console.log(e);
  }
});

afterAll(async () => {
  try {

    await database.drop({ logging: false });
    await database.close();
  } catch (e) {
    console.log(e);
  }
});

global.signin = async () => {
  const phone = "+989155555555";
  const name = "test";
  const lastname = "testly";
  const response = await request(app)
      .post("/api/v1/users/signup")
      .send({ phone, name,lastname })
      .expect(201);
  return response.get("Set-Cookie");
};