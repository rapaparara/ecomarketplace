const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')

router.get('/', TransactionController.show)
router.post('/', TransactionController.create)
router.get('/:id', TransactionController.getById)
router.put('/:id', TransactionController.updateById)
router.delete('/:id', TransactionController.destroy)

module.exports = router
