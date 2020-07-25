const express = require('express')
const {authenticate} = require("../controllers/user.controller.js");
const {createOrder, getOrdersList, updateOrder, getUntreatedOrders} = require("../controllers/order.controller.js");

const router = express.Router();

//ROUTES FOR USER
//create
router.post("/create", authenticate, createOrder);
// router.post("/track", getOrders);




//ROUTES FOR FACTORY
router.get("/list", getOrdersList)

router.get("/untreated", getUntreatedOrders)
// router.put("update", authenticate, updateOrder);
router.put("/update", updateOrder);

module.exports = router;
