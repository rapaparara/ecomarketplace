const CartService = require('../services/CartService')

exports.show = async (req, res) => {
   try {
      const data = await CartService.show()
      res.status(200).json({
         status: data.status,
         message: data.message,
         data: data.carts,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await CartService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.userNotFound) {
         res.status(400).json({
            status: false,
            message: 'User tidak ditemukan!',
         })
      } else {
         res.status(201).json({
            status: result.status,
            message: result.message,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.getById = async (req, res) => {
   try {
      const data = await CartService.getById(req.params)
      if (!data.status) {
         return res.json({
            status: data.status,
            message: data.message,
         })
      } else {
         return res.json({
            status: data.status,
            message: data.message,
            data: data.cart,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const result = await CartService.updateById(req.params.id, req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.userNotFound) {
         res.status(400).json({
            status: false,
            message: 'User tidak dtemukan!',
         })
      } else {
         res.status(201).json({
            status: result.status,
            message: result.message,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.destroy = async (req, res) => {
   try {
      const data = await CartService.destroy(req.params)
      return res.json({
         status: data.status,
         message: data.message,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
