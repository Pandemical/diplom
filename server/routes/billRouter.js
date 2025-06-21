const Router = require('express')
const router = new Router();
const billController = require('../controllers/billController')
const authMiddleware = require('../midlleware/authMidlleware')

router.post('/',authMiddleware,billController.create)
router.get('/', authMiddleware,billController.getAll)
router.get('/:id',authMiddleware,billController.getOne)
router.put('/:id', authMiddleware, billController.update).
router.delete('/:id',authMiddleware,billController.delete)

module.exports = router