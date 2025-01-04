const router = require("express").Router()

const { sequelize } = require('../util/db')

const { Op } = require('sequelize')
const { Blog, User } = require("../models")

router.get("/", async (req, res) => {
    const result = await Blog.findAll({
        attributes: [
            "author", 
            [sequelize.fn("COUNT", sequelize.col("author")), "blogs"],
            [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
        ],
        group: ["author"],
        order: [["likes", "DESC"]]
    })

    res.json(result)
})

module.exports = router