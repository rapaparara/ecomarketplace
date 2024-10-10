const Joi = require('joi')
const db = require('../models')
const Category = db.Category
const User = db.User
const Product = db.Product

exports.show = async () => {
   try {
      const products = await Product.findAll({
         include: [
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
            {
               model: Category,
               attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
         ],
         attributes: { exclude: ['seller_id', 'category_id'] },
      })
      return {
         status: true,
         message: 'Berhasil mengambil Produk',
         products: products,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         seller_id: Joi.string().min(5).required().messages({
            'string.min': 'Id user harus benar',
         }),
         category_id: Joi.string().min(5).required().messages({
            'string.min': 'Id kategori harus benar',
         }),
         name: Joi.string().min(5).max(30).required().messages({
            'string.min': 'Nama kategori minimal 5 karakter',
            'string.max': 'Nama kategori tidak boleh lebih dari 30 karakter',
         }),
         description: Joi.string().min(8).max(350).required().messages({
            'string.min': 'Deskripsi minimal 8 karakter',
            'string.max': 'Deskripsi tidak boleh lebih dari 350 karakter',
         }),
         price: Joi.number().integer().min(0).required().messages({
            'number.base': 'Harga harus berupa angka',
            'number.integer': 'Harga harus bilangan bulat',
            'number.min': 'Harga tidak boleh kurang dari 0',
         }),
         stock: Joi.number().integer().min(0).required().messages({
            'number.base': 'Stok harus berupa angka',
            'number.integer': 'Stok harus bilangan bulat',
            'number.min': 'Stok tidak boleh kurang dari 0',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }

      const user = await User.findOne({
         where: { id: data.seller_id },
      })
      if (!user) return { userNotFound: true }

      const category = await Category.findOne({
         where: { id: data.category_id },
      })
      if (!category) return { categoryNotFound: true }

      const { nanoid } = await import('nanoid')

      const generatedId = await nanoid()

      const product = await Product.create({
         id: generatedId,
         seller_id: data.seller_id,
         category_id: data.category_id,
         name: data.name,
         description: data.description,
         price: data.price,
         stock: data.stock,
      })

      return {
         status: true,
         message: `Berhasil membuat Produk dengan nama : ${product.name}`,
         data: product,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const product = await Product.findOne({
         include: [
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
            {
               model: Category,
               attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
         ],
         attributes: { exclude: ['seller_id', 'category_id'] },
         where: { id: data.id },
      })
      if (product)
         return {
            status: true,
            message: 'Berhasil mengambil Product',
            product: product,
         }
      else return { status: false, message: 'Produk tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const product = await Product.findByPk(id)
      if (!product) return { status: false, message: 'Produk tidak ditemukan!' }
      const schema = Joi.object({
         seller_id: Joi.string().min(5).messages({
            'string.min': 'Id user harus benar',
         }),
         category_id: Joi.string().min(5).messages({
            'string.min': 'Id kategori harus benar',
         }),
         name: Joi.string().min(5).max(30).messages({
            'string.min': 'Nama kategori minimal 5 karakter',
            'string.max': 'Nama kategori tidak boleh lebih dari 30 karakter',
         }),
         description: Joi.string().min(8).max(350).messages({
            'string.min': 'Deskripsi minimal 8 karakter',
            'string.max': 'Deskripsi tidak boleh lebih dari 350 karakter',
         }),
         price: Joi.number().integer().min(0).messages({
            'number.base': 'Harga harus berupa angka',
            'number.integer': 'Harga harus bilangan bulat',
            'number.min': 'Harga tidak boleh kurang dari 0',
         }),
         stock: Joi.number().integer().min(0).messages({
            'number.base': 'Stok harus berupa angka',
            'number.integer': 'Stok harus bilangan bulat',
            'number.min': 'Stok tidak boleh kurang dari 0',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }
      if (data.seller_id) {
         const user = await User.findOne({
            where: { id: data.seller_id },
         })
         if (!user) return { userNotFound: true }
      }

      if (data.category_id) {
         const category = await Category.findOne({
            where: { id: data.category_id },
         })
         if (!category) return { categoryNotFound: true }
      }

      if (await product.update(data)) {
         return {
            status: true,
            message: 'Berhasil mengupdate data',
         }
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.destroy = async (data) => {
   try {
      const product = await Product.findByPk(data.id)
      if (product) {
         await product.destroy()
         return { status: true, message: 'Produk berhasil dihapus' }
      } else return { status: false, message: 'Produk tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
