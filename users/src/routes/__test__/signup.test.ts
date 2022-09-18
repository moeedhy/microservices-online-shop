import request from "supertest";
import { app } from "../../app";

it("should return 422 if phone is incorrect", async function () {
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "514265", name: "moeed", lastname: "heydary" })
    .expect(422);
});
