const { Router } = require("express");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products");

// The `/api/products` endpoint

const router = Router();

// get all products
router.get("/", getAllProducts);

// get one product
router.get("/:id", getProduct);

// create new product
router.post("/", createProduct);

// update product
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
