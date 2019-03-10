const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.remove({})
  let userObject = new User(helper.initialUsers[0])
  await userObject.save()
})

test('correct amount of users are returned', async () => {
  const users = await helper.usersInDb()
  expect(users.length).toBe(1)
})

test('valid user is added', async () => {
  const newUser = {
    _id: '5a422a851b54a336234d17f6',
    name: 'validUser',
    username: 'validUsername',
    password: 'drowssap'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(2)
  const names = usersAtEnd.map(u => u.name)
  expect(names).toContain('validUser')
})
test('invalid user is not added', async () => {
  const newUser = {
    _id: '5a422a851b54a336234d17f6',
    name: 'u',
    username: 'validUsername',
    password: 'drowssap'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length)
})

test('user with missing fields is not added', async () => {
  const newUser = {
    _id: '5a422a851b54a336234d17f6',
    name: 'invaliduser',
    username: 'validUsername'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(404)

  usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length)
})
afterAll(() => {
  mongoose.connection.close()
})
