const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.show)
router.post('/', ProductController.create)
router.get('/:id', ProductController.getById)
router.put('/:id', ProductController.updateById)
router.delete('/:id', ProductController.destroy)

module.exports = router
