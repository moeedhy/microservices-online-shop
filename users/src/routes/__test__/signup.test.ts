import request from "supertest";
import { app } from "../../app";

it("should return 422 if phone is incorrect", async function () {
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "514265", name: "test", lastname: "testly" })
    .expect(422);
});

it("should return 422 if name or lastname is empty", async function () {
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555" })
    .expect(422);
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555", name: "test" })
    .expect(422);
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555", lastname: "testly" })
    .expect(422);
});

it("should return 201 if user created", async function () {
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555", name: "test", lastname: "testly" })
    .expect(201);
});

it("should return 422 if user signed up before", async function () {
  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555", name: "test", lastname: "testly" })
    .expect(201);

  await request(app)
    .post("/api/v1/users/signup")
    .send({ phone: "+989155555555", name: "test2", lastname: "testly" })
    .expect(422);
});
