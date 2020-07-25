const express = require('express')
const userRouter = require ('./user.router.js');
const orderRouter = require ('./order.router.js');

const router = express.Router();

router.get('/', (req,res) => {
    console.log('on /')
    res.send("Hello World")
})

router.use('/user', userRouter);
router.use('/order', orderRouter);

module.exports = router;
