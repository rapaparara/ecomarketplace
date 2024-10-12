const CartItemService = require('../services/CartItemService')

exports.show = async (req, res) => {
   try {
      const data = await CartItemService.show()
      res.status(200).json({
         status: data.status,
         message: data.message,
         data: data.cart_items,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await CartItemService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.productNotFound) {
         res.status(400).json({
            status: false,
            message: 'Produk tidak ditemukan!',
         })
      } else if (result.cartNotFound) {
         res.status(400).json({
            status: false,
            message: 'Keranjang tidak ditemukan!',
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
      const data = await CartItemService.getById(req.params)
      if (!data.status) {
         return res.json({
            status: data.status,
            message: data.message,
         })
      } else {
         return res.json({
            status: data.status,
            message: data.message,
            data: data.cart_item,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const result = await CartItemService.updateById(req.params.id, req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.productNotFound) {
         res.status(400).json({
            status: false,
            message: 'Produk tidak ditemukan!',
         })
      } else if (result.cartNotFound) {
         res.status(400).json({
            status: false,
            message: 'Keranjang tidak ditemukan!',
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
      const data = await CartItemService.destroy(req.params)
      return res.json({
         status: data.status,
         message: data.message,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
