const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Tämä on title",
    author: "Testi Mies",
    url: "http://www.sivu.fi/",
    likes: 5
  },
  {
    title: "Toinen title",
    author: "Jorma Jormanen",
    url: "http://www.blogi.fi/",
    likes: 530
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog has id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('blogs can be added', async () => {
  const newBlog = {
    title: "This was added",
    author: "Testi Henkilö",
    url: "http://www.site.fi/",
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('This was added')
})

test('adding a post without setting likes defaults to zero likes', async () => {
  const noLikesBlog = {
    title: "No likes on this",
    author: "Testi Henkilö",
    url: "http://www.site.fi/"
  }

  const response = await api
    .post('/api/blogs')
    .send(noLikesBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('adding a post without title and url results in 400', async () => {
  const noTitleOrUrlBlog = {
    author: "Unknown Man",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(noTitleOrUrlBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
