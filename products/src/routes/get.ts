import { Router } from "express";
import { Product } from "../models/product";
import { NotFoundError } from "@moeed/common";

const router = Router();

router.get("/get/:id", async (req, res, next) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (!product) throw new NotFoundError("Product not found");
    res.status(200).send({ message: "Product founded", data: { product } });
  } catch (e) {
    next(e);
  }
});
