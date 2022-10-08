import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { AttributeDoc } from "../models/attribute";
import { Product, ProductAttrs } from "../models/product";
import { AuthError, isAdmin, requireAuth } from "@moeed/common";

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
      } = req.body as ProductAttrs;

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

      res
        .status(201)
        .send({ message: "Product created successfully", data: product });
    } catch (e) {
      next(e);
    }
  }
);
