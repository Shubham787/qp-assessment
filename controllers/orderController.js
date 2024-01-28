const bcrypt = require("bcrypt");
const db = require("../model/models");
const { or, where } = require("sequelize");

const { order, product } = db;

const makeOrder = async (req, res) => {
  try {
    const { orderReq, userId } = req.body;

    await Promise.all(
      orderReq.map(async (i) => {
        const existingProduct = await product.findOne({
          where: { id: i.productId },
        });

        if (existingProduct && existingProduct.quantity >= i.quantity) {
          const newOrder = {
            productId: i.productId,
            userId: userId,
            price: existingProduct.price,
            quantity: i.quantity,
            total: existingProduct.price * i.quantity,
          };

          const madeOrder = await order.create(newOrder);

          await product.update(
            { quantity: existingProduct.quantity - i.quantity },
            {
              where: {
                id: i.productId,
              },
            }
          );
        } else {
          return res
            .status(200)
            .send("product not found/ or not enough quantity for order");
        }
      })
    );
    return res.status(201).send("success");
  } catch (error) {
    console.log(error);
  }
};

const allOrders = async (req, res) => {
  try {
    const allOrders = await order.findAll();

    return allOrders.length > 0
      ? res.status(200).send(allOrders)
      : res.status(200).send("No Orders");
  } catch (error) {
    console.log(error);
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const userOrders = await order.findAll({
      where: {
        userId: userId,
      },
    });

    return userOrders.length > 0
      ? res.status(200).send(userOrders)
      : res.status(200).send("No Orders");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeOrder,
  allOrders,
  userOrders,
};
