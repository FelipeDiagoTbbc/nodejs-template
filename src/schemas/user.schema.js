const Joi = require('joi')

const userSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)
    .min(3)
    .max(30)
    .required(),
  gender: Joi.string()
    .pattern(/^(Masculino|Femenino)$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\+?\d{1,4}[-\s]?\d{6,12}$/)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'company', 'edu', 'gov', 'org', 'co']
      }
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/
    )
    .required(),
  confirmPassword: Joi.ref('password'),
  photo: Joi.string().pattern(
    /^(?:(?=.*\.(png|jpg|jpeg))(?:[\w\s\d]+\.(png|jpg|jpeg))?)?$/
  ),
  role: Joi.string()
    .pattern(/^(Funcionario de Gobierno|Investigador|Administrador)$/)
    .required(),
  entity: Joi.string().min(3).max(100).required(),
  idCardPhoto: Joi.string()
    .pattern(/^(?:(?=.*\.(png|jpg|jpeg))(?:[\w\s\d]+\.(png|jpg|jpeg))?)?$/)
    .required(),
  entityCardPhoto: Joi.string()
    .pattern(/^(?:(?=.*\.(png|jpg|jpeg))(?:[\w\s\d]+\.(png|jpg|jpeg))?)?$/)
    .required()
})

function validateUser (user) {
  return userSchema.validate(user)
}

function validateUserUpdate (user) {
  return userSchema.partial().validate(user)
}

module.exports = {
  validateUser,
  validateUserUpdate
}