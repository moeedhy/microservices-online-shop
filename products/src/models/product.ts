import * as mongoose from "mongoose";
import { CategoryDoc } from "./category";
import { TagDoc } from "./tag";
import { FileDoc } from "./file";
import { AttributeDoc } from "./attribute";
import { Schema, Types } from "mongoose";

// enums
enum ProductAvailability {
  inStock = "instock",
  outOfStock = "outofstock",
}

enum ProductTypes {
  simple = "simple",
  variable = "variable",
}

// interfaces

export interface ProductAttrs {
  type: ProductTypes;
  title: string;
  description: string;
  longDescription?: string;
  sku: string;
  availability: ProductAvailability;
  dimensions?: {
    length: string;
    height: string;
    width: string;
  };
  weight?: string;
  attributes?: [AttributeDoc];
  variations?: [ProductDoc];
  categories: [CategoryDoc];
  creator: string;
  tags?: [TagDoc];
  images: [FileDoc];
  price: number;
  quantity: number;
}

interface ProductDoc extends mongoose.Document {
  type: ProductTypes;
  title: string;
  description: string;
  longDescription?: string;
  sku: string;
  availability: ProductAvailability;
  dimensions?: {
    length: string;
    height: string;
    width: string;
  };
  weight?: string;
  attributes?: [AttributeDoc];
  variations?: [ProductDoc];
  categories: [CategoryDoc];
  creator: string;
  tags?: [TagDoc];
  images: [FileDoc];
  price: number;
  quantity: number;
  version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}
const productSchema = new mongoose.Schema<ProductDoc, ProductModel>(
  {
    type: {
      type: String,
      enum: Object.values(ProductTypes),
      default: ProductTypes.simple,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
    },
    availability: {
      type: String,
      enum: Object.values(ProductAvailability),
      default: ProductAvailability.inStock,
      required: true,
    },
    weight: {
      type: String,
    },
    variations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    dimensions: {
      length: String,
      width: String,
      height: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.set("versionKey", "version");

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
