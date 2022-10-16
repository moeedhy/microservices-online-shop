import { NextFunction, Request, Response, Router } from "express";

import { Product, ProductAttrs } from "../../models/product";
import { AuthError, isAdmin, requireAuth } from "@moeed/common";
import { ProductCreatedPublisher } from "../../events/publishers/product-created";
import { rabbitMQ } from "../../rabbit";
import { Category } from "../../models/category";

const router = Router();

router.post(
  "/create/",
  requireAuth,
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        type,
        dimensions,
        price,
        sku,
        weight,
        title,
        variations,
        availability,
        tags,
        images,
        quantity,
        categories,
        attributes,
        description,
        longDescription,
      } = req.body;

      // check categories
      const categoryCheck = await Category.find({ id: { $or: categories } });

      // check attributes

      // check tags

      // check files

      const checkSku = await Product.findOne({ sku });
      if (checkSku) throw new AuthError("SKU is already existed");

      const product = Product.build({
        type,
        description,
        longDescription,
        attributes,
        categories,
        quantity,
        images,
        tags,
        availability,
        variations,
        title,
        weight,
        sku,
        creator: req.currentUser!.id,
        price,
        dimensions,
      });
      await product.save();
      await new ProductCreatedPublisher(rabbitMQ.client).publish({
        id: product.id,
        price: product.price,
        title: product.title,
        quantity: product.quantity,
        version: product.version,
      });
      res
        .status(201)
        .send({ message: "Product created successfully", data: product });
    } catch (e) {
      next(e);
    }
  }
);
