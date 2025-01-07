const { User, Session } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")
const router = require("express").Router()

router.post("/", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  })

  const passwordCorrect = req.body.password === "salainen"

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password",
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: "account disabled, please contact admin",
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({ token })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
