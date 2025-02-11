const router = require('express').Router();
const { Authentication } = require('./userAuth');
const User = require('../Model/User');
const Book = require('../Model/books');
const Order = require('../Model/order');

router.post("/place-order", Authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order, date } = req.body;

    if (!Array.isArray(order) || order.length === 0) {
      return res.status(400).json({
        status: "Failure",
        message: "No items found in the order",
      });
    }

    const orderIds = [];

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderDataFromDb.book },
      });

      orderIds.push(orderDataFromDb._id);
      order.updatedDate = date;
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
      orderIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failure",
      message: "An error occurred while placing the order",
    });
  }
});

router.get('/get-order-history', Authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" }
    });

    const orderData = userData.orders.reverse();
    return res.json({
      status: "success",
      data: orderData,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occurs" });
  }
});

router.get("/get-all-orders", Authentication, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book"
      })
      .populate({
        path: "user"
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: userData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occurs" });
  }
});

router.put("/update-status/:id", Authentication, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "success",
      message: "status updated successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occurs" });
  }
});

router.delete("/delete-order/:id", Authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        status: "Failure",
        message: "Order not found",
      });
    }
    
    await User.findByIdAndUpdate(deletedOrder.user, {
      $pull: { orders: id },
    });

    return res.json({
      status: "Success",
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failure",
      message: "An error occurred while deleting the order",
    });
  }
});

module.exports = router;
