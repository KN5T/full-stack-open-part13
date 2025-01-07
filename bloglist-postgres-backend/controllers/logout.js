const { Session } = require("../models")
const { tokenExtractor } = require("../util/middleware")
const router = require("express").Router()

router.delete("/", tokenExtractor, async (req, res) => {
  const session = await Session.findOne({ where: { token: req.token } })
  session.destroy()
  res.status(204).end()
})


module.exports = router