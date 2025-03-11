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
    origin: "http://localhost:3000", // Your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Allow credentials
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
