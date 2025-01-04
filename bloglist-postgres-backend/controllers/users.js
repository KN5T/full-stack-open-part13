const router = require("express").Router()
const { userFinder } = require("../util/middleware")

const { User, Blog } = require("../models")

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:username', userFinder, async (req, res) => {
  if(req.user) {
    req.user.name = req.body.name
    await req.user.save()
    return res.json(req.user)
  } else {
    return res.status(404).json({ error: "User not found" })
  }
})


module.exports = router