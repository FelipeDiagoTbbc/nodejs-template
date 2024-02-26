const { StatusCodes } = require('http-status-codes')
// const { catchedAsync } = require("../utils");
const { validateUser, validateUserUpdate } = require('../schemas/user.schema'); // validateUserUpdate

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const uuid = require('uuid');

class UserController {
	constructor({ userService }) {
		// inyección de dependencias para el Service
		this.userService = userService;
	}

  // Get all users
  getUsers = async (req, res) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  // Create a new user
  signUp = async (req, res, next) => {
    const result = validateUser(req.body);
		if (result.error) {
			return res.status(400).json({ error: result.error.details.map((error) => error.message)});
		}

    try {
      const signedUser = await this.userService.signUp({ result });
      if (signedUser) {
        res.status(StatusCodes.CREATED).json({ user: signedUser });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Error al registrar el usuario' });
      }
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getByEmail({email: req.params.email});
      if (user) {
        res.status(StatusCodes.OK).json({ user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const result = validateUserUpdate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details.map((error) => error.message)});
    }

    try {
      const updatedUser = await this.userService.update({ user: result.value });
      if (updatedUser) {
        res.status(StatusCodes.OK).json({ user: updatedUser });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Error al actualizar el usuario' });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const user = await this.userService.delete({ id: req.params.id });
      if (user) {
        res.status(StatusCodes.OK).json({ user });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  };

  // Logout user
  logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out now');
        res.redirect('/users/signin');
    });
  };

  // Forgot password
  forgotPassword = async (req, res) => {
    const email = req.params.id;

    try {
        // Check if the user with the provided email exists in the database
        const user = await this.userService.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Generate a unique temporary token for the password change
        const token = uuid.v4();

        // Set the token expiration to 30 minutes (in seconds)
        const expirationTime = 30 * 60;

        // Sign the token with a secret key for added security
        const signedToken = jwt.sign({ token, email }, process.env.JWT_SECRET_KEY, { expiresIn: expirationTime });

        // Send the temporary token by email
        this.sendChangePasswordLinkByEmail(email, signedToken);

        res.json({ message: 'Se ha enviado una contraseña temporal al correo electrónico proporcionado.' });
    } catch (error) {
        console.error('Error al generar la contraseña temporal:', error);
        res.status(500).json({ error: 'Error al generar la contraseña temporal.' });
    }
  };

  // Change password
  changePassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify token and extract the signed temporary token
        const secretKey = process.env.JWT_SECRET_KEY;
        const decodedToken = jwt.verify(token, secretKey);
        const { token: signedToken } = decodedToken;

        // Verify if token is valid (not expired and matches the previously generated token)
        const isTokenValid = jwt.decode(token).token === signedToken;

        if (!isTokenValid) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        // Find the user by the email in the database
        const user = await this.userService.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Usuario no encontrado' });
        }

        // Encrypt the new password before saving it to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
  };

  // Function to send the change password link by email
  sendChangePasswordLinkByEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ivancholg11@gmail.com',
            pass: 'gdlzandzraigjyaw',
        },
    });

    const changePasswordLink = `http://localhost:${process.env.PORT}/users/change-password/${token}`;

    const mailOptions = {
        from: 'ivancholg11@gmail.com',
        to: email,
        subject: 'Cambio de contraseña',
        text: `Para cambiar tu contraseña, haz clic en el siguiente enlace: ${changePasswordLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });
  }
}

module.exports = UserController;