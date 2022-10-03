import mongoose from "mongoose";

export interface AttributeDoc extends mongoose.Document {
  name: string;
  options: [string];
  version: number;
}
