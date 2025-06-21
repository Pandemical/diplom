const Router = require('express');
const router = new Router();

const billRouter = require('./billRouter');
const categoryRouter = require('./categoryRouter');
const typeRouter = require('./typeRouter');
const transactionRouter = require('./transactionRouter');
const userRouter = require('./userRouter');
const predictionRouter = require('./predictionRouter');

router.use('/user', userRouter);
router.use('/bill', billRouter);
router.use('/transaction', transactionRouter);
router.use('/type', typeRouter);
router.use('/category', categoryRouter);
router.use('/predict', predictionRouter); 

module.exports = router;
