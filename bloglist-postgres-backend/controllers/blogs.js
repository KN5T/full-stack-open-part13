const router = require("express").Router()
const { blogFinder, tokenExtractor } = require("../util/middleware")

const { Op } = require('sequelize');

const { Blog, User } = require("../models")

router.get('/', async (req, res) => {
  let where = {}

  if(req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"]
    },
    where,
    order: [["likes", "DESC"]]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if(req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    return res.json(req.blog)
  } else {
    return res.status(404).json({ error: "Blog not found" })
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if(req.blog) {
    if(req.blog.userId === user.id) {
      await req.blog.destroy()
      return res.status(200).json({ message: "Blog deleted succesfully!"})
    } else {
      return res.status(400).json({ message: "Only blog creator can delete the blog!" })
    }
  } else {
    return res.status(404).json({ error: "Blog not found" })
  }
})

module.exports = router