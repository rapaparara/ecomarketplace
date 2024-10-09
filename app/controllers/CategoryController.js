const CategoryService = require('../services/CategoryService')

exports.show = async (req, res) => {
   try {
      const data = await CategoryService.show()
      res.status(200).json({
         status: data.status,
         message: data.message,
         data: data.categories,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.create = async (req, res) => {
   try {
      const result = await CategoryService.create(req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
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
      const data = await CategoryService.getById(req.params)
      if (data.status === 'fail') {
         return res.json({
            status: data.status,
            message: data.message,
         })
      } else {
         return res.json({
            status: data.status,
            message: data.message,
            data: data.category,
         })
      }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const result = await CategoryService.updateById(req.params.id, req.body)
      if (result.error) {
         res.status(400).json({ error: result.error })
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
      const data = await CategoryService.destroy(req.params)
      return res.json({
         status: data.status,
         message: data.message,
      })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
