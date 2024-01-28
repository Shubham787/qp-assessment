const bcrypt = require("bcrypt");
const db = require("../model/models");
const { where } = require("sequelize");

const product = db.product;

const createProduct = async (req, res) => {
  try {
    const newProduct = await product.create(req.body);

    return res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId, name, price, description, quantity } = req.body;

    const existingProduct = await product.findOne({
      where: {
        id: productId,
      },
    });

    if (existingProduct) {
      req.body.productId = undefined;
      const updatedProduct = await product.update(req.body, {
        where: { id: productId },
        returning: true,
      });

      return res.status(200).send(updatedProduct);
    } else {
      return res.status(200).send("Product not Founds");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const existingProduct = await product.findOne({
      where: {
        id: productId,
      },
    });

    if (existingProduct) {
      const deletedProduct = await product.destroy({
        where: { id: productId },
      });

      return res.sendStatus(200).send(deletedProduct);
    } else {
      return res.sendStatus(200).send("Product not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const allProducts = async (req, res) => {
  try {
    const allProducts = await product.findAll({});

    return allProducts.length > 0
      ? res.status(200).send(allProducts)
      : res.status(200).send("No Products");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  allProducts,
  deleteProduct,
};
