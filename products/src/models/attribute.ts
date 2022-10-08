import mongoose, { Model, Schema, Types } from "mongoose";

interface AttributeAtrrs {
  id: Types.ObjectId;
  name: string;
  options: [string];
  version: number;
}

export interface AttributeDoc extends mongoose.Document {
  name: string;
  options: [string];
  version: number;
}
interface AttributeModel extends mongoose.Model<AttributeDoc> {
  build(attrs: AttributeAtrrs): AttributeDoc;
}

const attributeSchema = new Schema<AttributeDoc>({
  name: { type: String, required: true },
  options: { type: [String], required: true },
  version: {
    type: Number,
    required: true,
  },
});

attributeSchema.statics.build = (attrs: AttributeAtrrs) => {
  return new Attribute(attrs);
};

const Attribute = mongoose.model<AttributeDoc, AttributeModel>(
  "Attribute",
  attributeSchema
);
export { Attribute };
