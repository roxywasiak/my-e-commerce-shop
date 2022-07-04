const router = require("express").Router();
const { Category, Product } = require("../../models");

//all the attr stored in one variable
const PRODUCT_ATTRIBUTES = ["product_name", "price", "stock"];

// function for the put controller request
const cleanupPayload = (payload) => {
  const editableFields = ["id", "category_name"];

  // go through payload and check if each field exists in editableFields

  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (editableFields.includes(key)) {
      return {
        ...acc,
        [key]: value,
      };
    }

    return acc;
  }, {});
};

// The `/api/categories` endpoint
router.get(
  "/",
  (Category = async (req, res) => {
    // find all categories
    try {
      // be sure to include its associated Products
      const categories = await Category.findAll({
        include: [{ model: Product, attributes: PRODUCT_ATTRIBUTES }],
      });
      return res.json(categories);
    } catch (error) {
      console.log(`[ERROR]: Failed to get all categories | ${error.message}`);
develop/routes/api/product-routes.js      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.get(
  "/:id",
  (Category = async (req, res) => {
    // find one category by its `id` value
    try {
      // be sure to include its associated Products
      const categoryId = await Category.findByPk(req.params.id, {
        include: [{ model: Product, attributes: PRODUCT_ATTRIBUTES }],
      });

      if (categoryId) {
        // send the books in the response
        return res.json(categoryId);
      }
      return res
        .status(404)
        .json({ success: false, message: "Category does not exist" });
    } catch (error) {
      console.log(`[ERROR]: Failed to get the Category ID | ${error.message}`);
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
      const newCategory = await Category.create(category);
      return res.json(newCategory);
    } catch (error) {
      console.log(`[ERROR]: Failed to create new category | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.put(
  "/:id",
  (updateCategory = async (req, res) => {
    // update a category by its `id` value
    try {
      // get the fields to update from the req body
      const payload = cleanupPayload(req.body);

      console.log(req.body);
      console.log(payload);

      // validate payload
      if (Object.keys(payload).length) {
        // update the book in the DB
        await Category.update(payload, {
          where: {
            categoryId: req.params.id,
          },
        });

        // send response
        return res.json({ success: true });
      }

      // send the bad request response
      return res
        .status(400)
        .json({ success: false, error: "Please provide a valid payload" });
    } catch (error) {
      console.log(`[ERROR]: Failed to update the Category | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  })
);

router.delete(
  "/:id",
(deleteCategory = async (req, res) => {
  // delete a category by its `id` value
  try {

     // delete the book by id from DB
    const deleteCategory = (req, res) => {
    await Category.destroy({
     where: {
      category_id: req.params.id,
    },
   });

   // send response
    return res.json({ success: true });
  } catch (error) {
  console.log(`[ERROR]: Failed to delete Category | ${error.message}`);
  return res.status(500).json({ success: false, error: error.message });
}
  
})
);


module.exports = router;
