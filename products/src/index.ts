import { app } from "./app";
import mongoose from "mongoose";
import { rabbitMQ } from "./rabbit";

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("database parameters not set");
  if (!process.env.JWT_KEY) throw new Error("JWT key not setup");
  if (process.env.RABBIT_URI) throw new Error("Rabbitmq uri must be defined");

  try {
    await rabbitMQ.connect("amqp://localhost");
    rabbitMQ.client.on("close", () => {
      console.log("Rabbitmq connection is closed");
      process.exit();
    });
    process.on("SIGINT", () => rabbitMQ.client.close());
    process.on("SIGTERM", () => rabbitMQ.client.close());

    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Product service is run on 3000"));
  } catch (e) {
    console.error("database cannot connect");
  }
};
start();
