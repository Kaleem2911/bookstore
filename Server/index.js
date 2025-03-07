const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./Connection/Connection");
const router = require("./Routes/user");
const books = require('./Routes/book')
const favourites = require('./Routes/favourites');
const cart = require('./Routes/cart')
const order = require('./Routes/order')

app.use(
  cors({
    origin: "*", // Allow all origins (Not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", router);
app.use("/",books);
app.use("/",favourites);
app.use("/",cart);
app.use("/",order);



app.listen(process.env.PORT, () => {
  console.log(`Server is Connected PORT : ${process.env.PORT}`);
});
