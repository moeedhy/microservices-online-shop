import * as mongoose from "mongoose";
import { CategoryDoc } from "./category";
import { TagDoc } from "./tag";
import { FileDoc } from "./file";
import { AttributeDoc } from "./attribute";

// enums
enum ProductAvailability {
  inStock = "instock",
  outOfStock = "outofstock",
  onBackOrder = "onbackorder",
}
enum ProductStatus {
  published = "publish",
  draft = "draft",
  private = "private",
}
enum ProductTypes {
  simple = "simple",
  grouped = "grouped",
  external = "external",
  variable = "variable",
}
enum DiscountTypes {
  percentage = 1,
  fixed = 2,
}

// interfaces

interface ProductAttrs {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  featured: boolean;
  sku: string;
  price: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: [FileDoc] | null;
  download_expiry: number;
  external_url: string | null;
  availability: ProductAvailability;
  back_ordered: boolean;
  sold_individually: boolean;
  tags: [TagDoc] | null;
  dimensions: { length: string; width: string; height: string };
  weight: string;
  purchase_note: string | null;
  variations: [ProductDoc] | null;
  related_ids: [ProductDoc] | null;
  attributes: [AttributeDoc];
  author: number;
  categories: [CategoryDoc];
  images: [FileDoc];
  type: ProductTypes;
  quantity: number | null;
  discount: {
    type: DiscountTypes;
    amount: number;
    startDate: Date;
    expireDate: Date;
  } | null;
}
interface ProductDoc extends mongoose.Document {}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}
const productSchema = new mongoose.Schema({}, { timestamps: true });

productSchema.set("versionKey", "version");

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);
