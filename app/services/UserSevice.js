const Joi = require('joi')
const db = require('../models')
const User = db.User

exports.show = async () => {
   try {
      return await User.findAll()
   } catch (error) {
      throw new Error(error.message)
   }
}

exports.create = async (data) => {
   try {
      const schema = Joi.object({
         username: Joi.string()
            .alphanum() 
            .min(5)
            .max(30)
            .required()
            .messages({
               'string.min': 'Username harus minimal 5 karakter',
               'string.max': 'Username tidak boleh lebih dari 30 karakter',
               'string.alphanum': 'Username hanya boleh menggunakan kombinasi huruf atau angka',
            }),
         password: Joi.string()
            .min(8)
            .max(30)
            .required()
            .messages({
               'string.min': 'Password harus minimal 8 karakter',
               'string.max': 'Password tidak boleh lebih dari 30 karakter',
            }),
         role: Joi.string()
            .valid('buyer', 'seller', 'admin')
            .required()
            .messages({
               'any.only' : 'Role yang anda pilih tidak sesuai'
            }),
      })

      const { error } = schema.validate(data)
      if (error) {
         return { error: error.details[0].message }
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

      return { user }
   } catch (error) {
      throw new Error(error.message)
   }
}
