const router = require('express').Router()

const UserService = require('../services')

const { UserController } = require('../controllers')
const passport = require('passport')
const userController = new UserController(UserService)

// Get user
router.get('/', userController.getUsers)
router.get('/:email',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
)
// Register user
router.post('/signup', userController.signUp)
// Update user
router.put('/update/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
)
router.delete('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
)


router.get('/logout', userController.logout)
router.get('/forgot-password/:id', userController.forgotPassword)
router.post('/change-password/:token',
  passport.authenticate('jwt', { session: false }),
  userController.changePassword
)

module.exports = router
