const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.show)
router.post('/', UserController.create)
router.get('/:id', UserController.getById)
router.put('/:id', UserController.updateById)
router.delete('/:id', UserController.destroy)

module.exports = router