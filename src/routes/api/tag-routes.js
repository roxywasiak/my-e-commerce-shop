const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
} = require("../../controllers/tags");

// The `/api/tags` endpoint

router.get("/", getAllTags);
// find all tags
// be sure to include its associated Product data

router.get("/:id", getTagById);
// find a single tag by its `id`
// be sure to include its associated Product data

router.post("/", createTag);
// create a new tag

router.put("/:id", updateTag);
// update a tag's name by its `id` value

router.delete("/:id", deleteTagById);
// delete on tag by its `id` value

module.exports = router;
