const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
} = require("../../controllers/api/tags");

// The `/api/tags` endpoint

router.get("/", getAllTags (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", getTagById (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/",createTag (req, res) => {
  // create a new tag
});

router.put("/:id", updateTag (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id",deleteTagById (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
