const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../models");

const PRODUCT_ATTRIBUTES = ["id", "product_name", "price", "stock"];

// The `/api/products` endpoint

// get all products

// find all products
const getAllProducts = async (req, res) => {
  try {
    // be sure to include its associated Products
    const products = await Product.findAll({
      // be sure to include its associated Category and Tag data
      attributes: PRODUCT_ATTRIBUTES,
      include: [{ model: Category }, { model: Tag }],
    });
    return res.json(products);
  } catch (error) {
    console.log(`[ERROR]: Failed to get all Products | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get one product

// find a single product by its `id`
const getProduct = async (req, res) => {
  // find one category by its `id` value
  try {
    // be sure to include its associated Products
    const product = await Product.findByPk(req.params.id, {
      attributes: PRODUCT_ATTRIBUTES,
      include: [{ Category, Tag }],
    });

    if (product) {
      // send the products in the response
      return res.json(product);
    }
    return res
      .status(404)
      .json({ success: false, message: "Product does not exist" });
  } catch (error) {
    console.log(`[ERROR]: Failed to get the Product | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// create new product
const createProduct = async (req, res) => {
  try {
    const createProductRequest = {
      product_name: req.body.productName,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
      category_id: req.boy.category_id,
    };

    const newProduct = await Product.create(createProductRequest);
    Product.create(req.body)
      .then((newProduct) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: newProduct.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }

        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (err) {}
};

// update product
const updateProduct = async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
};

const deleteProduct = async (req, res) => {
  // delete one product by its `id` value
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(product);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete product| ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
