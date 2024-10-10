const express = require('express')
const router = express.Router()
const ProductReviewController = require('../controllers/ProductReviewController')

router.get('/', ProductReviewController.show)
router.post('/', ProductReviewController.create)
router.get('/:id', ProductReviewController.getById)
router.put('/:id', ProductReviewController.updateById)
router.delete('/:id', ProductReviewController.destroy)

module.exports = router
