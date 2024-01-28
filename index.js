const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const db = require("./model/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");

app.use("/product", product);
app.use("/order", order);
app.use("/user", user);

const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.send("Hello Question PRO!");
});

app.listen(port, () => {
  console.log(`QUESTION PRO app listening on port ${port}`);
});
