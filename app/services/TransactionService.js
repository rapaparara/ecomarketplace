const Joi = require('joi')
const db = require('../models')
const Cart = db.Cart
const User = db.User
const Transaction = db.Transaction

exports.show = async () => {
   try {
      const transactions = await Transaction.findAll({
         include: [
            {
               model: Cart,
               include: [
                  {
                     model: User,
                     attributes: {
                        exclude: ['password', 'role', 'createdAt', 'updatedAt'],
                     },
                  },
               ],
               attributes: { exclude: ['buyer_id', 'createdAt', 'updatedAt'] },
            },
         ],
         attributes: { exclude: ['cart_id'] },
      })
      return {
         status: true,
         message: 'Berhasil mengambil Item Keranjang',
         transactions: transactions,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         cart_id: Joi.string().min(5).required().messages({
            'string.min': 'Id Cart harus benar',
         }),
         payment_method: Joi.string()
            .valid('credit_card', 'paypal', 'bank_transfer')
            .required()
            .messages({
               'any.only': 'Metode pembayaran yang anda pilih tidak sesuai',
            }),
         payment_status: Joi.string()
            .valid('paid', 'unpaid')
            .required()
            .messages({
               'any.only': 'Status metode pembayaran tidak sesuai',
            }),
         shipping_address: Joi.string().min(8).max(350).messages({
            'string.min': 'Alamat Pengiriman minimal 8 karakter',
            'string.max':
               'Alamat Pengiriman tidak boleh lebih dari 350 karakter',
         }),
         shipping_status: Joi.string()
            .valid('pending', 'shipped', 'dellivered')
            .required()
            .messages({
               'any.only': 'Status pengiriman tidak sesuai',
            }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }

      const cart = await Cart.findOne({
         where: { id: data.cart_id },
      })
      if (!cart) return { cartNotFound: true }

      const { nanoid } = await import('nanoid')
      const generatedId = await nanoid()

      const transaction = await Transaction.create({
         id: generatedId,
         cart_id: data.cart_id,
         payment_method: data.payment_method,
         payment_status: data.payment_status,
         shipping_address: data.shipping_address,
         shipping_status: data.shipping_status,
      })

      return {
         status: true,
         message: `Berhasil membuat Transaksi!`,
         data: transaction,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const transaction = await Transaction.findAll({
         include: [
            {
               model: Cart,
               attributes: { exclude: ['buyer_id', 'createdAt', 'updatedAt'] },
            },
         ],
         attributes: { exclude: ['cart_id'] },
         where: { id: data.id },
      })
      if (transaction.length > 0)
         return {
            status: true,
            message: 'Berhasil mengambil Transaksi',
            transaction: transaction,
         }
      else return { status: false, message: 'Transaksi tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const transaction = await Transaction.findByPk(id)
      if (!transaction)
         return { status: false, message: 'Transaksi tidak ditemukan!' }

      const schema = Joi.object({
         cart_id: Joi.string().min(5).messages({
            'string.min': 'Id Cart harus benar',
         }),
         payment_method: Joi.string()
            .valid('credit_card', 'paypal', 'bank_transfer')
            .messages({
               'any.only': 'Metode pembayaran yang anda pilih tidak sesuai',
            }),
         payment_status: Joi.string().valid('paid', 'unpaid').messages({
            'any.only': 'Status metode pembayaran tidak sesuai',
         }),
         shipping_address: Joi.string().min(8).max(350).messages({
            'string.min': 'Alamat Pengiriman minimal 8 karakter',
            'string.max':
               'Alamat Pengiriman tidak boleh lebih dari 350 karakter',
         }),
         shipping_status: Joi.string()
            .valid('pending', 'shipped', 'dellivered')
            .messages({
               'any.only': 'Status pengiriman tidak sesuai',
            }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }
      if (data.cart_id) {
         const cart = await Cart.findOne({
            where: { id: data.cart_id },
         })
         if (!cart) return { cartNotFound: true }
      }

      if (await transaction.update(data)) {
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
      const transaction = await Transaction.findByPk(data.id)
      if (transaction) {
         await transaction.destroy()
         return { status: true, message: 'Transaksi berhasil dihapus' }
      } else return { status: false, message: 'Transaksi tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
