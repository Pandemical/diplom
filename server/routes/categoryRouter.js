const Router = require('express')
const router = new Router();
const categoryController = require('../controllers/categoryController')
const authMidlleware = require('../midlleware/authMidlleware');

router.post('/',authMidlleware,categoryController.create)
router.get('/',authMidlleware,categoryController.getAll)
router.delete('/:id',authMidlleware,categoryController.delete)

module.exports = router