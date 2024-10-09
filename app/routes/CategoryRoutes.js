const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/', CategoryController.show)
router.post('/', CategoryController.create)
router.get('/:id', CategoryController.getById)
router.put('/:id', CategoryController.updateById)
router.delete('/:id', CategoryController.destroy)

module.exports = router
