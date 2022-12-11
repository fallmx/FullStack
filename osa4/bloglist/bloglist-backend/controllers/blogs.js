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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  body = request.body

  newNote = {}
  for (key in body) {
    if (["title", "author", "url", "likes"].includes(key)) {
      newNote[key] = body[key]
    } else {
      return response.status(400).end()
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newNote, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
