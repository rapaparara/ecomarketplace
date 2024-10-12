const Joi = require('joi')
const db = require('../models')
const Cart = db.Cart
const Product = db.Product
const CartItem = db.CartItem
const User = db.User

exports.show = async () => {
   try {
      const cart_items = await CartItem.findAll({
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
            {
               model: Product,
               attributes: ['id', 'name', 'description'],
            },
         ],
         attributes: { exclude: ['product_id', 'cart_id'] },
      })
      return {
         status: true,
         message: 'Berhasil mengambil Item Keranjang',
         cart_items: cart_items,
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
         product_id: Joi.string().min(5).required().messages({
            'string.min': 'Id Cart harus benar',
         }),
         quantity: Joi.number().integer().min(0).required().messages({
            'number.base': 'Quantity harus berupa angka',
            'number.integer': 'Quantity harus bilangan bulat',
            'number.min': 'Quantity tidak boleh kurang dari 0',
         }),
         price: Joi.number().integer().min(0).required().messages({
            'number.base': 'Harga harus berupa angka',
            'number.integer': 'Harga harus bilangan bulat',
            'number.min': 'Harga tidak boleh kurang dari 0',
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
      const product = await Product.findOne({
         where: { id: data.product_id },
      })
      if (!product) return { productNotFound: true }

      const { nanoid } = await import('nanoid')
      const generatedId = await nanoid()

      const cart_items = await CartItem.create({
         id: generatedId,
         cart_id: data.cart_id,
         product_id: data.product_id,
         quantity: data.quantity,
         price: data.price,
      })

      return {
         status: true,
         message: `Berhasil dimasukkan ke Item Keranjang`,
         data: cart_items,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const cart_item = await CartItem.findAll({
         include: [
            {
               model: Cart,
               attributes: { execlude: ['createdAt', 'updatedAt'] },
            },
            {
               model: Product,
               attributes: ['id', 'name', 'description'],
            },
         ],
         attributes: { exclude: ['product_id', 'cart_id'] },
         where: { id: data.id },
      })
      if (cart_item)
         return {
            status: true,
            message: 'Berhasil mengambil Item Keranjang',
            cart_item: cart_item,
         }
      else return { status: false, message: 'Item Keranjang tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const cart_item = await CartItem.findByPk(id)
      if (!cart_item)
         return { status: false, message: 'Item Keranjang tidak ditemukan!' }

      const schema = Joi.object({
         cart_id: Joi.string().min(5).messages({
            'string.min': 'Id Cart harus benar',
         }),
         product_id: Joi.string().min(5).messages({
            'string.min': 'Id Cart harus benar',
         }),
         quantity: Joi.number().integer().min(0).messages({
            'number.base': 'Quantity harus berupa angka',
            'number.integer': 'Quantity harus bilangan bulat',
            'number.min': 'Quantity tidak boleh kurang dari 0',
         }),
         price: Joi.number().integer().min(0).messages({
            'number.base': 'Harga harus berupa angka',
            'number.integer': 'Harga harus bilangan bulat',
            'number.min': 'Harga tidak boleh kurang dari 0',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }
      if (data.product_id) {
         const product = await Product.findOne({
            where: { id: data.product_id },
         })
         if (!product) return { productNotFound: true }
      }
      if (data.cart_id) {
         const cart = await Cart.findOne({
            where: { id: data.cart_id },
         })
         if (!cart) return { cartNotFound: true }
      }

      if (await cart_item.update(data)) {
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
      const cart_items = await CartItem.findByPk(data.id)
      if (cart_items) {
         await cart_items.destroy()
         return { status: true, message: 'Items Keranjang berhasil dihapus' }
      } else
         return { status: false, message: 'Items Keranjang tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}
