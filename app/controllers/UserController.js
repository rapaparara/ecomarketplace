const userService = require('../services/UserSevice')

exports.show = async (req, res) => {
   try {
      const users = await userService.show()
      res.status(200).json({
         message: 'Berhasil mengambil Users',
         data: users,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await userService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.usernameExist) {
         res.status(400).json({ message: 'Username already exists!' })
      } else {
         res.status(201).json({
            message: `Creating user with name ${result.user.username} success!`,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
