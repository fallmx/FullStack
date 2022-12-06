const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  body = request.body

  if (!("title" in body) || !("url" in body)) {
    response.status(400).end()
  } else {
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: "likes" in body ? body.likes : 0
    }
  
    const blog = new Blog(newBlog)
  
    result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogsRouter
