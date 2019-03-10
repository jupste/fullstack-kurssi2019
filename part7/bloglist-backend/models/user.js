const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  name: { type: String, unique: false, required: true, minlength: 3 },
  passwordHash: { type: String, unique: false, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // suodatetaan passwordHash eli salasanan tiiviste pois näkyviltä
    delete returnedObject.passwordHash
  }
})
userSchema.plugin(validator)
const User = mongoose.model('User', userSchema)

module.exports = User
