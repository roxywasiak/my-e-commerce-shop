const router = require("express").Router();
const { Category, Product } = require("../../models");

//all the attr stored in one variable
const PRODUCT_ATTRIBUTES = ["product_name", "price", "stock"];

// The `/api/categories` endpoint
router.get(
  "/",
  (categories = async (req, res) => {
    // find all categories
    try {
      // be sure to include its associated Products
      const categories = await Category.findAll({
        include: [{ model: Product, attributes: PRODUCT_ATTRIBUTES }],
      });
      return res.json(categories);
    } catch (error) {
      console.log(`[ERROR]: Failed to get all categories | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.get(
  "/:id",
  (categoryId = async (req, res) => {
    // find one category by its `id` value
    try {
      // be sure to include its associated Products
      const categoryId = await Category.findByPk(req.params.id, {
        include: [{ model: Product, attributes: product }],
      });

      if (categoryId) {
        // send the books in the response
        return res.json(categoryId);
      }
      return res
        .status(404)
        .json({ success: false, message: "Category does not exist" });
    } catch (error) {
      console.log(`[ERROR]: Failed to get the category id | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.post(
  "/",
  (newCategory = async (req, res) => {
    // create a new category
    try {
      // get new category data from request body
      const category = req.body;

      // insert category in the DB
      const newCategory = await category.create(category);
      return res.json(newCategory);
    } catch (error) {
      console.log(`[ERROR]: Failed to create new category | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
