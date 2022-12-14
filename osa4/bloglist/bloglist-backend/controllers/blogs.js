const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET) 
  const user = await User.findById(decodedToken.id)

  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET) 

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete) {
    if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'user not authorized to delete resource' })
    }
  
    blogToDelete.delete()
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    strict: 'throw'
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
