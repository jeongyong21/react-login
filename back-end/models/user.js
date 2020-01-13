var db = require("../db")
var mongoose = db.mongoose
var autoIncrement = db.autoIncrement

var userSchema = mongoose.Schema({
  email: String,
  password: String
})

userSchema.statics.findOneByUserId = function(email) {
  return this.findOne({ email: email }).exec()
}

// verify the password of the User documment
userSchema.methods.verify = function(password) {
  return this.password === password
}

userSchema.plugin(autoIncrement.plugin, { model: "user", startAt: 1 })

module.exports = mongoose.model("user", userSchema, "user")
