const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('correct amount of blogs are returned', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs.length).toBe(3)
})
test('blog id is named right', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})
test('blog can be added', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f6',
    title: 'New Blog',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain('New Blog')
})

test('blog with no author or title is not added', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f6',
    author: 'Michael Chan',
    url: 'https://undefined.com/',
    likes: 0,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const anotherBlog = {
    _id: '5a422a851b54a676234d17f6',
    title: 'Virtues of undefined likes',
    url: 'https://undefined.com/',
    likes: 0,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(anotherBlog)
    .expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('blog with no likes formats to zero likes', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f6',
    title: 'Virtues of undefined likes',
    author: 'Michael Chan',
    url: 'https://undefined.com/',
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Virtues of undefined likes')
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBeDefined()
})
test('blogs can be deleted', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})
test('blog can be updated', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  const newContent = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1
  }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newContent)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBeGreaterThan(blogToUpdate.likes)
})
afterAll(() => {
  mongoose.connection.close()
})
