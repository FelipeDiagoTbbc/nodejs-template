class AuthController {
  constructor({ authService }) {
    this.authService = authService
  }

  loginUser = async (req, res, next) => {
    try {
      const { user } = req // passport local strategy add the user to the req object
      if (user.recoveryToken) {
        delete user.recoveryToken
      }
      const token = await this.authService.singJWT(user);
      const clientUser = user.toClient();
      clientUser.token = token;
      res.json({ user: clientUser });
    } catch (err) {
      next(err)
    }
  }

  recovery = async (req, res, next) => {
    try {
      const { email } = req.body
      const result = await this.authService.sendRecovery(email)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

  changePassUser = async (req, res, next) => {
    try {
      const { token, newPassword } = req.body
      const result = await this.authService.changePassword(token, newPassword)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AuthController
