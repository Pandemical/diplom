const Router = require('express');
const router = new Router();

const predictionController = require('../controllers/predictionController');
const authMidlleware = require('../midlleware/authMidlleware');

router.get('/', authMidlleware, predictionController.getAll);

module.exports = router;
