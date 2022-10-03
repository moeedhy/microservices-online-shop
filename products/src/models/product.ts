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
  onBackOrder = "onbackorder",
}
enum ProductStatus {
  published = "publish",
  draft = "draft",
  private = "private",
}
enum ProductTypes {
  simple = "simple",
  external = "external",
  variable = "variable",
}
enum DiscountTypes {
  percentage = "percentage",
  fixed = "fixed",
  none = "none",
}

// interfaces

interface ProductAttrs {
  title: string;
  slug?: string;
  description?: string;
  long_description?: string;
  featured: boolean;
  sku?: string;
  price: number;
  virtual: boolean;
  downloadable: boolean;
  downloads?: [FileDoc];
  download_expiry?: number;
  external_url?: string;
  availability: ProductAvailability;
  back_ordered: boolean;
  sold_individually: boolean;
  tags: [TagDoc];
  quantity?: number;
  dimensions?: { length: string; width: string; height: string };
  weight?: string;
  purchase_note?: string;
  variations?: [ProductDoc];
  related_ids?: [ProductDoc];
  attributes?: [AttributeDoc];
  author: number;
  categories: [CategoryDoc];
  images: [FileDoc];
  type: ProductTypes;
  status: ProductStatus;

  discount?: {
    type: DiscountTypes;
    amount: number;
    startDate: Date;
    expireDate: Date;
  };
}

interface ProductDoc extends mongoose.Document {
  title: string;
  slug?: string;
  description?: string;
  long_description?: string;
  featured: boolean;
  sku?: string;
  price: number;
  virtual: boolean;
  downloadable: boolean;
  downloads?: [FileDoc];
  download_expiry?: number;
  external_url?: string;
  availability: ProductAvailability;
  back_ordered: boolean;
  sold_individually: boolean;
  tags: [TagDoc];
  quantity?: number;
  dimensions?: { length: string; width: string; height: string };
  weight?: string;
  purchase_note?: string;
  variations?: [ProductDoc];
  related_ids?: [ProductDoc];
  attributes?: [AttributeDoc];
  author: number;
  categories: [CategoryDoc];
  images: [FileDoc];
  type: ProductTypes;
  status: ProductStatus;

  discount?: {
    type: DiscountTypes;
    amount: number;
    startDate: Date;
    expireDate: Date;
  };
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}
const productSchema = new mongoose.Schema<ProductDoc, ProductModel>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,

    long_description: String,
    attributes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Attribute" }],
    },
    author: {
      type: Schema.Types.Number,
      required: true,
    },
    sku: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      enum: Object.values(ProductAvailability),
      default: ProductAvailability.inStock,
    },
    quantity: {
      type: Number,
    },
    discount: {
      type: {
        type: {
          type: String,
          enum: Object.values(DiscountTypes),
          default: DiscountTypes.none,
        },
        amount: {
          type: Number,
        },
        startDate: {
          type: Date,
        },
        expireDate: {
          type: Date,
        },
      },
    },
    type: {
      type: String,
      enum: Object.values(ProductTypes),
      default: ProductTypes.simple,
      required: true,
    },
    categories: {
      type: [{ type: Schema.Types.ObjectId, ref: "Category" }],
      required: true,
    },
    back_ordered: {
      type: Boolean,
      default: false,
    },
    dimensions: {
      type: {
        length: String,
        width: String,
        height: String,
      },
    },
    download_expiry: Number,
    downloadable: {
      type: Boolean,
      default: false,
    },
    downloads: {
      type: [String],
    },
    external_url: String,
    featured: {
      type: Boolean,
      required: true,
    },
    images: {
      type: [{ type: Schema.Types.ObjectId, ref: "File" }],
      required: true,
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    },
    purchase_note: String,
    related_ids: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    variations: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    weight: String,
    sold_individually: {
      type: Boolean,
      default: false,
    },
    virtual: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.draft,
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
