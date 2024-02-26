const UsersService = require('./user.service')

const bcrypt = require('bcrypt')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')

class AuthService {
  static async getUser(email, password) {
    const user = await UsersService.getByEmail({ email })
    if (!user) {
      throw new Error("The email doesn't exist")
    }
    // const isHash = await bcrypt.compare(password, user.password);
    const isHash = await user.matchPassword(password)
    if (!isHash) {
      throw new Error('Invalid password')
    }
    return user
  }

  static async singJWT(user) {
    const payload = {
      sub: user.id,
      exp: Date.now() + parseInt(config.jwtLifeTime),
      username: user.firstName,
      email: user.email,
      role: user.role
    }
    const secret = config.jwtSecret
    // console.log(secret);
    const token = jwt.sign(payload, secret)
    return token
  }

  static async sendRecovery(email, password) {
    const user = await UsersService.findByEmail(email)
    if (!user) {
      throw new Error("The email doesn't exist")
    }

    // check if user already has a token, if so, throw error
    jwt.verify(user.recoveryToken, config.emailSecret, (err) => {
      if (!err) throw new Error('User already has a recovery token')
    })

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.emailSecret, { expiresIn: '15m' })
    const link = `${config.host}:${config.port}/api/v1/auth/recovery?token=${token}`
    await UsersService.update(user.id, { recoveryToken: token })
    const mail = {
      from: config.email, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recuperar contraseña', // Subject line
      html: `<b>Ingresa a este link para recuperar contraseña ${link}</h1>`
    }
    const res = await this.sendMail(mail)
    return res
  }

  static async sendMail(emailInfo) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        // Para configurar user y pass se entra a la página de https://ethereal.email/create
        // Aparece después de dar en "Create Account" la info de la cuena fake (varía cada vez que entras a ethereal):
        user: `${config.email}`,
        pass: `${config.emailPass}`
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    await transporter.sendMail(emailInfo)
    return 'Email sent'
  }

  static async changePassword(token, newPassword) {
    try {
      const payload = await jwt.verify(token, config.emailSecret)
      const user = await UsersService.find(payload.sub)
      console.table(payload)
      console.table(user)
      if (user.recoveryToken !== token) throw new Error('Invalid token')

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      // after changing password, delete recoveryToken
      await UsersService.update(user.id, {
        recoveryToken: null,
        password: hashedPassword
      })
      return { message: 'Password changed successfully' }
    } catch (err) {
      throw new Error("Ups, something went wrong, couldn't change password.")
    }
  }
}

module.exports = AuthService
