const Joi = require('joi')
const db = require('../models')
const Category = db.Category

exports.show = async () => {
   try {
      const categories = await Category.findAll()
      return {
         status: 'ok',
         message: 'Berhasil mengambil Categories',
         categories: categories,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         name: Joi.string().min(5).max(30).required().messages({
            'string.min': 'Nama kategori minimal 5 karakter',
            'string.max': 'Nama kategori tidak boleh lebih dari 30 karakter',
         }),
         description: Joi.string().min(8).max(350).required().messages({
            'string.min': 'Deskripsi minimal 8 karakter',
            'string.max': 'Deskripsi tidak boleh lebih dari 350 karakter',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: 'fail',
            message: error.details[0].message,
         }
      }

      const { nanoid } = await import('nanoid')

      const generatedId = await nanoid()

      const category = await Category.create({
         id: generatedId,
         name: data.name,
         description: data.description,
      })

      return {
         status: 'ok',
         message: `Berhasil membuat kategori dengan nama : ${category.name}`,
         data: category,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const category = await Category.findByPk(data.id)
      if (category)
         return {
            status: 'ok',
            message: 'Berhasil mengambil Kategori',
            category: category,
         }
      else return { status: 'fail', message: 'Kategori tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const category = await Category.findByPk(id)
      if (!category)
         return { status: 'fail', message: 'Kategori tidak ditemukan!' }
      const schema = Joi.object({
         name: Joi.string().min(5).max(30).messages({
            'string.min': 'Nama kategori minimal 5 karakter',
            'string.max': 'Nama kategori tidak boleh lebih dari 30 karakter',
         }),
         description: Joi.string().min(8).max(350).messages({
            'string.min': 'Deskripsi minimal 8 karakter',
            'string.max': 'Deskripsi tidak boleh lebih dari 350 karakter',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: 'fail',
            message: error.details[0].message,
         }
      }
      if (await category.update(data)) {
         return {
            status: 'ok',
            message: 'Berhasil mengupdate data',
         }
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.destroy = async (data) => {
   try {
      const category = await Category.findByPk(data.id)
      if (category) {
         await category.destroy()
         return { status: 'ok', message: 'Kategori berhasil dihapus' }
      } else return { status: 'fail', message: 'Kategori tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
