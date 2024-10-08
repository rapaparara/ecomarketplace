const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.show)
router.post('/', UserController.create)
// router.get('/:id', userController.getUserById)
// router.put('/:id', userController.updateUserById)
// router.delete('/:id', userController.destroyUser)

module.exports = router