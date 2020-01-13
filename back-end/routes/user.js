var express = require("express")
var router = express.Router()

const authMiddleware = require("../middlewares/auth")
const Auth = require("../models/user.js")
const jwt = require("jsonwebtoken")

router.post("/sign-up", function(req, res) {
  let newUser = new Auth()
  newUser.email = req.body.email
  newUser.password = req.body.password
  newUser
    .save()
    .then(result => {
      res.json({
        result: "success"
      })
    })
    .catch(err => {
      console.log(err)
      res.json({ err: err })
    })
})

router.post("/login", function(req, res) {
  const { email, password } = req.body
  const secret = req.app.get("jwt-secret")

  // check the user info & generate the jwt
  const check = user => {
    if (!user) {
      // user does not exist
      throw new Error("login failed")
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              emnail: user.email
            },
            secret,
            {
              expiresIn: "1d",
              issuer: "hbrothers-ent.com",
              subject: "user"
            },
            (err, token) => {
              if (err) reject(err)
              resolve(token)
            }
          )
        })
        return p
      } else {
        throw new Error("login failed")
      }
    }
  }

  // respond the token
  const respond = token => {
    res.json({
      message: "logged in successfully",
      token
    })
  }

  // error occured
  const onError = error => {
    res.status(403).json({
      message: error.message
    })
  }

  // find the user
  Auth.findOneByUserId(email)
    .then(check)
    .then(respond)
    .catch(onError)
})

router.use("/check", authMiddleware)
router.get("/check", function(req, res) {
  res.json({
    success: true
    //info: req.decoded
  })
})

router.get("/userContent", function(req, res, next) {
  res.send({ data: "User content" })
})

module.exports = router
