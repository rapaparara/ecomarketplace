const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.show)
router.post('/', CartController.create)
router.get('/:id', CartController.getById)
router.put('/:id', CartController.updateById)
router.delete('/:id', CartController.destroy)

module.exports = router
