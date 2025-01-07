const router = require("express").Router()
const { ReadingList, User } = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.post("/", async (req, res) => {
  const { user_id, blog_id } = req.body
  const readingListEntry = await ReadingList.create({
    userId: user_id,
    blogId: blog_id,
  })
  return res.json(readingListEntry)
})

router.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readingListEntry = await ReadingList.findByPk(req.params.id)

  if (!readingListEntry) {
    return res.status(404).json({ error: "ReadinglistEntry not found" })
  }

  if(user.id !== readingListEntry.userId) {
    return res.status(400).json({ error: "You dont own this blog in your reading list" })
  }

  readingListEntry.read = req.body.read
  await readingListEntry.save()
  return res.json(readingListEntry)
})

module.exports = router
