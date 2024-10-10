const Joi = require('joi')
const db = require('../models')
const User = db.User
const Product = db.Product
const Category = db.Category
const ProductReview = db.ProductReview

exports.show = async () => {
   try {
      const product_reviews = await ProductReview.findAll({
         include: [
            {
               model: Product,
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
               attributes: ['id', 'name', 'description'],
            },
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
         ],
         attributes: { exclude: ['buyer_id', 'product_id'] },
      })
      return {
         status: true,
         message: 'Berhasil mengambil Produk',
         product_reviews: product_reviews,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         product_id: Joi.string().min(5).required().messages({
            'string.min': 'Id Produk harus benar',
         }),
         buyer_id: Joi.string().min(5).required().messages({
            'string.min': 'Id Buyer kategori harus benar',
         }),
         rating: Joi.number().integer().min(0).required().messages({
            'number.base': 'Rating harus berupa angka',
            'number.integer': 'Rating harus bilangan bulat',
            'number.min': 'Rating tidak boleh kurang dari 0',
         }),
         comment: Joi.string().min(8).max(350).required().messages({
            'string.min': 'Komentar minimal 8 karakter',
            'string.max': 'Komentar tidak boleh lebih dari 350 karakter',
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
         where: { id: data.buyer_id },
      })
      if (!user) return { userNotFound: true }

      const product = await Product.findOne({
         where: { id: data.product_id },
      })
      if (!product) return { productNotFound: true }

      const { nanoid } = await import('nanoid')

      const generatedId = await nanoid()

      const product_review = await ProductReview.create({
         id: generatedId,
         buyer_id: data.buyer_id,
         product_id: data.product_id,
         rating: data.rating,
         comment: data.comment,
      })

      return {
         status: true,
         message: `Berhasil menambahkan review untuk produk ini`,
         data: product_review,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const product_review = await ProductReview.findOne({
         include: [
            {
               model: Product,
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
               attributes: ['id', 'name', 'description'],
            },
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
         ],
         attributes: { exclude: ['buyer_id', 'product_id'] },
         where: { id: data.id },
      })
      if (product_review)
         return {
            status: true,
            message: 'Berhasil mengambil Review Produk',
            product_review: product_review,
         }
      else return { status: false, message: 'Review Produk tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const product_review = await ProductReview.findByPk(id)
      if (!product_review)
         return { status: false, message: 'Review Produk tidak ditemukan!' }

      const schema = Joi.object({
         product_id: Joi.string().min(5).messages({
            'string.min': 'Id Produk harus benar',
         }),
         buyer_id: Joi.string().min(5).messages({
            'string.min': 'Id Buyer kategori harus benar',
         }),
         rating: Joi.number().integer().min(0).messages({
            'number.base': 'Rating harus berupa angka',
            'number.integer': 'Rating harus bilangan bulat',
            'number.min': 'Rating tidak boleh kurang dari 0',
         }),
         comment: Joi.string().min(8).max(350).messages({
            'string.min': 'Komentar minimal 8 karakter',
            'string.max': 'Komentar tidak boleh lebih dari 350 karakter',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }
      if (data.buyer_id) {
         const user = await User.findOne({
            where: { id: data.buyer_id },
         })
         if (!user) return { userNotFound: true }
      }
      if (data.product_id) {
         const product = await Product.findOne({
            where: { id: data.product_id },
         })
         if (!product) return { productNotFound: true }
      }

      if (await product_review.update(data)) {
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
      const product_review = await ProductReview.findByPk(data.id)
      if (product_review) {
         await product_review.destroy()
         return { status: true, message: 'Review Produk berhasil dihapus' }
      } else return { status: false, message: 'Review Produk tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
