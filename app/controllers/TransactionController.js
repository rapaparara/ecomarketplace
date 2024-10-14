const TransactionService = require('../services/TransactionService')

exports.show = async (req, res) => {
   try {
      const data = await TransactionService.show()
      res.status(200).json({
         status: data.status,
         message: data.message,
         data: data.transactions,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await TransactionService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
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
      const data = await TransactionService.getById(req.params)
      if (!data.status) {
         return res.json({
            status: data.status,
            message: data.message,
         })
      } else {
         return res.json({
            status: data.status,
            message: data.message,
            data: data.transaction,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const result = await TransactionService.updateById(
         req.params.id,
         req.body
      )
      if (result.error) {
         res.status(400).json({ error: result.error })
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
      const data = await TransactionService.destroy(req.params)
      return res.json({
         status: data.status,
         message: data.message,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
