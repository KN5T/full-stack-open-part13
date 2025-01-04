const Blog = require("./models/blog")

const printBlogs = async () => {
    const blogs = await Blog.findAll()
    const blogsJson = blogs.map(blog => blog.toJSON())
    console.log("Blogs:")

    blogsJson.forEach(blog => {
        console.log(`${blog.author}: \x1b[32m'${blog.title}'\x1b[0m, ${blog.likes} likes`)
    })
}

printBlogs()