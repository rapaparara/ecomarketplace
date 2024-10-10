const ProductReviewService = require('../services/ProductReviewService')

exports.show = async (req, res) => {
   try {
      const data = await ProductReviewService.show()
      res.status(200).json({
         status: data.status,
         message: data.message,
         data: data.product_reviews,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await ProductReviewService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.userNotFound) {
         res.status(400).json({
            status: false,
            message: 'User tidak ditemukan!',
         })
      } else if (result.productNotFound) {
         res.status(400).json({
            status: false,
            message: 'Produk tidak ditemukan!',
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
      const data = await ProductReviewService.getById(req.params)
      if (!data.status) {
         return res.json({
            status: data.status,
            message: data.message,
         })
      } else {
         return res.json({
            status: data.status,
            message: data.message,
            data: data.product_review,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const result = await ProductReviewService.updateById(
         req.params.id,
         req.body
      )
      console.log(result)
      if (result.error) {
         res.status(400).json({ error: result.error })
      } else if (result.userNotFound) {
         res.status(400).json({
            status: false,
            message: 'User tidak dtemukan!',
         })
      } else if (result.productNotFound) {
         res.status(400).json({
            status: false,
            message: 'Produk tidak ditemukan!',
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
      const data = await ProductReviewService.destroy(req.params)
      return res.json({
         status: data.status,
         message: data.message,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
