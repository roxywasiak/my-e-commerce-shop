const { Tag } = require("../../models");

const getAllTags = async (req, res) => {
  try {
    const tagInfo = await Tag.findAll();

    return res.json(tagInfo);
  } catch (error) {
    console.log(`[ERROR]: Failed to get all tags| ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getTagById = async (req, res) => {
  try {
    const tagInfo = await Tag.findByPk(req.params.id);
    return res.json(tagInfo);
  } catch (error) {
    console.log(`[ERROR]: Failed to get the Tag ID | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }

  const createTag = async (req, res) => {
    try {
      const { tag_name } = req.body;
      const tagInfo = await Tag.create({
        tag_name,
      });
      if (!tag_name) {
        return res
          .status(500)
          .json({ success: false, error: "Need to include tag name" });
      }
      return res.json(tagInfo);
    } catch (error) {
      console.log(`[ERROR]: Failed to create new tag | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  const updateTag = async (req, res) => {
    try {
      const tagInfo = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      return res.json(tagInfo);
    } catch (error) {
      console.log(`[ERROR]: Failed to update tag | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  };
};

const deleteTagById = async (req, res) => {
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(tagInfo);
  } catch (error) {
    console.log(`[ERROR]: Failed to create new category | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
};
