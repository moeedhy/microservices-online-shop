import amqplib, { Connection } from "amqplib";

class Rabbit {
  private _client?: Connection;

  get client() {
    if (!this._client) throw new Error("Client must be defined before connect");
    return this._client;
  }

  async connect(url: string) {
    try {
      this._client = await amqplib.connect(url);
      console.log("connected");
    } catch (e) {
      console.log(e);
    }
  }
}

export const RabbitMQ = new Rabbit();
