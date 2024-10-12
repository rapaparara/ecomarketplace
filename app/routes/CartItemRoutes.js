const express = require('express')
const router = express.Router()
const CartItemController = require('../controllers/CartItemController')

router.get('/', CartItemController.show)
router.post('/', CartItemController.create)
router.get('/:id', CartItemController.getById)
router.put('/:id', CartItemController.updateById)
router.delete('/:id', CartItemController.destroy)

module.exports = router
