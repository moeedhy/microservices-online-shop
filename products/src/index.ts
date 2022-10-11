import { app } from "./app";
import mongoose from "mongoose";
import { RabbitMQ } from "./Rabbit";

const start = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("database parameters not set");
    if (!process.env.JWT_KEY) throw new Error("JWT key not setup");
    await mongoose.connect(process.env.MONGO_URI!);
    await RabbitMQ.connect("amqp://localhost");
    app.listen(3000, () => console.log("Product service is run on 3000"));
  } catch (e) {
    console.error("database cannot connect");
  }
};
start();
