const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany()
  await User.insertMany(helper.initialUsers)
})

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({ username: 'SavedUser' })
  })

  test('returns all users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('username must be unique', async () => {
    const existingUsers = await api.get('/api/users')
    const existingUser = {
      username: existingUsers.body[0].username,
      name: existingUsers.body[0].name,
      password: 'yabadabaduu'
    }

    await api.post('/api/users')
      .send(existingUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('password must be longer than 3 characters', async () => {
    let user = helper.initialUsers[0]
    user.password = '12'

    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(() => mongoose.connection.close())
