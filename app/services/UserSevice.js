const Joi = require('joi')
const db = require('../models')
const bcryptjs = require('bcryptjs')
const User = db.User

exports.show = async () => {
   try {
      const users = await User.findAll()
      return {
         status: true,
         message: 'Berhasil mengambil Users',
         users: users,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         username: Joi.string().alphanum().min(5).max(30).required().messages({
            'string.min': 'Username harus minimal 5 karakter',
            'string.max': 'Username tidak boleh lebih dari 30 karakter',
            'string.alphanum':
               'Username hanya boleh menggunakan kombinasi huruf atau angka',
         }),
         password: Joi.string().min(8).max(30).required().messages({
            'string.min': 'Password harus minimal 8 karakter',
            'string.max': 'Password tidak boleh lebih dari 30 karakter',
         }),
         role: Joi.string()
            .valid('buyer', 'seller', 'admin')
            .required()
            .messages({
               'any.only': 'Role yang anda pilih tidak sesuai',
            }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }

      const usernameExist = await User.findOne({
         where: { username: data.username },
      })
      if (usernameExist) return { usernameExist: true }

      const { nanoid } = await import('nanoid')
      const bcryptjs = require('bcryptjs')

      const generatedId = await nanoid()
      const hashedPassword = await bcryptjs.hash(data.password, 12)

      const user = await User.create({
         id: generatedId,
         username: data.username,
         password: hashedPassword,
         role: data.role,
      })

      return {
         status: true,
         message: `Berhasil membuat user dengan username : ${user.username}`,
         data: user,
      }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.getById = async (data) => {
   try {
      const user = await User.findByPk(data.id)
      if (user)
         return { status: true, message: 'Berhasil mengambil user', user: user }
      else return { status: false, message: 'User tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.updateById = async (id, data) => {
   try {
      const user = await User.findByPk(id)
      if (!user) return { status: false, message: 'User tidak ditemukan!' }
      const usernameExist = await User.findOne({
         where: { username: data.username },
      })
      if (usernameExist) return { usernameExist: true }

      const schema = Joi.object({
         username: Joi.string().alphanum().min(5).max(30).messages({
            'string.min': 'Username harus minimal 5 karakter',
            'string.max': 'Username tidak boleh lebih dari 30 karakter',
            'string.alphanum':
               'Username hanya boleh menggunakan kombinasi huruf atau angka',
         }),
         password: Joi.string().min(8).max(30).messages({
            'string.min': 'Password harus minimal 8 karakter',
            'string.max': 'Password tidak boleh lebih dari 30 karakter',
         }),
         role: Joi.string().valid('buyer', 'seller', 'admin').messages({
            'any.only': 'Role yang anda pilih tidak sesuai',
         }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return {
            status: false,
            message: error.details[0].message,
         }
      }
      if (data.password) data.password = await bcryptjs.hash(data.password, 12)
      if (await user.update(data)) {
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
      const user = await User.findByPk(data.id)
      if (user) {
         await user.destroy()
         return { status: true, message: 'User berhasil dihapus' }
      } else return { status: false, message: 'User tidak ditemukan!' }
   } catch (error) {
      throw new Error(error.message)
   }
}