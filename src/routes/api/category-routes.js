const { Router } = require("express");

const {
  getAllCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories");
// The `/api/categories` endpoint

const router = Router();

router.get("/", getAllCategories);

router.get("/:id", getCategory);

router.post("/", newCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
