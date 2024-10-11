const Joi = require('joi')
const db = require('../models')
const Cart = db.Cart
const User = db.User

exports.show = async () => {
   try {
      const carts = await Cart.findAll({
         include: [
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
         ],
         attributes: { exclude: ['buyer_id'] },
      })
      return {
         status: true,
         message: 'Berhasil mengambil Keranjang',
         carts: carts,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         buyer_id: Joi.string().min(5).required().messages({
            'string.min': 'Id user harus benar',
         }),
         total_price: Joi.number().integer().min(0).required().messages({
            'number.base': 'Total Harga harus berupa angka',
            'number.integer': 'Total Harga harus bilangan bulat',
            'number.min': 'Total Harga tidak boleh kurang dari 0',
         }),
         status: Joi.string()
            .valid('pending', 'completed', 'cancelled')
            .required()
            .messages({
               'any.only': 'Status yang anda pilih tidak sesuai',
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

      const { nanoid } = await import('nanoid')
      const generatedId = await nanoid()

      const cart = await Cart.create({
         id: generatedId,
         buyer_id: data.buyer_id,
         total_price: data.total_price,
         status: data.status,
      })

      return {
         status: true,
         message: `Berhasil dimasukkan ke Keranjang`,
         data: cart,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const cart = await Cart.findAll({
         include: [
            {
               model: User,
               attributes: {
                  exclude: ['password', 'role', 'createdAt', 'updatedAt'],
               },
            },
         ],
         attributes: { exclude: ['buyer_id'] },
         where: { id: data.id },
      })
      if (cart)
         return {
            status: true,
            message: 'Berhasil mengambil Keranjang',
            cart: cart,
         }
      else return { status: false, message: 'Keranjang tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const cart = await Cart.findByPk(id)
      if (!cart) return { status: false, message: 'Keranjang tidak ditemukan!' }

      const schema = Joi.object({
         buyer_id: Joi.string().min(5).messages({
            'string.min': 'Id user harus benar',
         }),
         total_price: Joi.number().integer().min(0).messages({
            'number.base': 'Total Harga harus berupa angka',
            'number.integer': 'Total Harga harus bilangan bulat',
            'number.min': 'Total Harga tidak boleh kurang dari 0',
         }),
         status: Joi.string()
            .valid('pending', 'completed', 'cancelled')
            .messages({
               'any.only': 'Status yang anda pilih tidak sesuai',
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

      if (await cart.update(data)) {
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
      const cart = await Cart.findByPk(data.id)
      if (cart) {
         await cart.destroy()
         return { status: true, message: 'Keranjang berhasil dihapus' }
      } else return { status: false, message: 'Keranjang tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
