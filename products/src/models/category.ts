import mongoose from "mongoose";
import { ProductAttrs } from "./product";

export interface CategoryDoc extends mongoose.Document {}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: ProductAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema({});

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Product",
  categorySchema
);

export { Category };
