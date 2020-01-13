var mongoose = require("mongoose")
var autoIncrement = require("mongoose-auto-increment")

// Database
mongoose.Promise = global.Promise
mongoose.set("useFindAndModify", false)
mongoose.connect("mongodb://localhost:27017", { dbName: "node-api", useNewUrlParser: "true" })
autoIncrement.initialize(mongoose.connection)

console.log("DB connected!")

var db = {}
db.mongoose = mongoose
db.autoIncrement = autoIncrement

module.exports = db
