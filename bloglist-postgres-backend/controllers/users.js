const router = require("express").Router()
const { userFinder } = require("../util/middleware")

const { User, Blog } = require("../models")
const { Op } = require("sequelize")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  })
  res.json(users)
})

router.get("/:id", async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  console.log("where", where)

  const user = await User.findByPk(req.params.id, {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId"] },
      through: { attributes: ["id", "read"], where },
    },
  })

  if (user) {
    return res.json(user)
  } else {
    return res.status(404).json({ error: "User not found" })
  }
})

router.post("/", async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put("/:username", userFinder, async (req, res) => {
  if (req.user) {
    req.user.name = req.body.name
    await req.user.save()
    return res.json(req.user)
  } else {
    return res.status(404).json({ error: "User not found" })
  }
})

module.exports = router
