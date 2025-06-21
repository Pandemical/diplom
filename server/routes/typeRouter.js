const Router = require('express')
const router = new Router();
const typeController = require('../controllers/typeController')
const authMiddleware = require('../midlleware/authMidlleware')

router.post('/',authMiddleware,typeController.create)
router.get('/', authMiddleware,typeController.getAll)
router.get('/:id',authMiddleware,typeController.getOne)
router.delete('/:id',authMiddleware,typeController.delete)

module.exports = router