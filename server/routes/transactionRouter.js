const Router = require('express')
const router = new Router();
const transactionController = require('../controllers/transactionController');
const authMidlleware = require('../midlleware/authMidlleware');

router.post('/',authMidlleware,transactionController.create)
router.get('/',authMidlleware,transactionController.getAll)
router.delete('/:id',authMidlleware,transactionController.delete)

module.exports = router