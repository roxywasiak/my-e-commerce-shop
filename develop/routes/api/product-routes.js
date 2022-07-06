const { Router } = require("express");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../../controllers/api/products");

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

router.delete("/:id", deleteProductById);

module.exports = router;
