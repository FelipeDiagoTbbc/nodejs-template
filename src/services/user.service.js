const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: false },
    role: { type: String, required: true },
    entity: { type: String, required: true },
    idCardPhoto: { type: String, required: true },
    entityCardPhoto: { type: String, required: false },
    isDeleted: { type: Boolean, required: true, defaults: false },
    deletedAt: { type: Date, required: false, defaults: null },
    recoveryToken: { type: String, required: false, defaults: null }
  },
  {
    timestamps: true
  }
)

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const { _id, __v, ...otherProps } = returnedObject
    return { id: _id, ...otherProps }
  }
})

UserSchema.methods.toClient = function () {
  const {
    _id,
    firstName,
    lastName,
    password,
    isDeleted,
    deletedAt,
    __v,
    ...rest
  } = this.toObject()
  return {
    id: _id,
    name: `${firstName} ${lastName}`,
    ...rest
  }
}

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('User', UserSchema)

class UserModel {
  static async getAll() {
    try {
      const users = await User.find({ isDeleted: false }).select('-password')
      return users
    } catch (error) {
      throw new Error('Failed to get users')
    }
  }

  static async getById({ id }) {
    try {
      const user = await User.findById(id)
      return user
    } catch (error) {
      throw new Error('Failed to get user by id')
    }
  }

  static async getByEmail({ email }) {
    // for passport local strategy
    try {
      const user = await User.findOne({ email, isDeleted: false }).select(
        '-isDeleted -__v'
      )
      return user
    } catch (error) {
      throw new Error(
        'Failed to get user by email. Original error: ' + error.message
      )
    }
  }

  // create a new user
  static async signUp({ result }) {
    try {
      const emailUser = await User.findOne({
        email: result.value.email,
        isDeleted: false
      })

      if (emailUser) {
        throw new Error('El usuario ya existe')
      } else {
        const newUser = User({
          ...result.value,
          isDeleted: false,
          deletedAt: null
        })
        newUser.password = await newUser.encryptPassword(result.value.password)
        await newUser.save()
        const userObject = newUser.toObject()
        delete userObject.password
        return userObject
      }
    } catch (error) {
      console.error('[UserModel] ', error.name, ' -> ', error.message)
      console.error('Error occurred in', error.stack.split('\n')[1].trim())
      throw new Error(error.message)
    }
  }

  static async update({ user }) {
    try {
      const userOld = await User.findOne({
        email: user.email,
        isDeleted: false
      })

      if (userOld) {
        const updatedUser = await User.findOneAndUpdate(
          { email: user.email },
          user,
          { new: true }
        )
        return updatedUser
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      throw new Error('Failed to update user')
    }
  }

  static async delete({ id }) {
    try {
      const user = await this.userService.findOneAndUpdate(
        { _id: id },
        {
          isDeleted: true,
          deletedAt: new Date()
        },
        { new: true }
      )

      return user
    } catch (error) {
      throw new Error('Failed to delete user')
    }
  }
}

module.exports = UserModel
