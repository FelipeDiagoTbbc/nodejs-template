const Joi = require('joi')

const email = Joi.string().email()
const password = Joi.string().min(8).max(40)

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const changePassword = Joi.object({
  token: Joi.string().required(),
  newPassword: password.required()
})


module.exports = {
  loginAuthSchema,
  changePassword
}
