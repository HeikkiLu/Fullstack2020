const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let testBlog = {
  'title': 'Test blog',
  'author': 'Blog Doer',
  'url': 'www.google.com',
  'likes': '1234'
}

describe('user has not authenticated', () => {

  beforeAll(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogKeys = Object.keys(response.body[0])
    expect(blogKeys).toContain('id')
  })

})
describe('user has authenticated', () => {

  let token

  beforeAll(async () => {
    token = `bearer ${helper.generateToken()}`
  })

  test('add blog', async () => {
    const blogsBefore = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(testBlog)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length + 1)

    const blogs = blogsAfter.map(blog => blog.title)
    expect(blogs).toContain('Test blog')
  })

  test('update blog', async () => {
    const response = await api
      .post('/api/blogs')
      .send(testBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blog = response.body

    blog.title = 'This blog was updated'

    const savedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .set({ Authorization: token })
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body).toEqual(blog)
  })

  test('delete blog', async () => {
    let blogToDelete = testBlog
    blogToDelete.title = 'DELETE THIS'
    const response = await api
      .post('/api/blogs')
      .send(blogToDelete)
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blog = response.body

    const blogsBefore = await helper.blogsInDb()

    const blogIdsBefore = blogsBefore.map(b => b.id)
    expect(blogIdsBefore).toContain(blog.id)

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set({ Authorization: token })
      .expect(204)

    const blogsAfter = await helper.blogsInDb()

    const blogIdsAfter = blogsAfter.map(b => b.id)
    expect(blogIdsAfter.length).toBe(blogsBefore.length - 1)
    expect(blogIdsAfter).not.toContain(blog.id)
  })


  describe('error handling', () => {

    test('if blog likes are null, likes are set 0', async () => {
      let testBlogWithNoLikes = testBlog
      testBlogWithNoLikes.likes = null
      await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send(testBlogWithNoLikes)

      const blogs = await helper.blogsInDb()
      const blogLikes = blogs.map(blog => blog.likes)
      expect(blogLikes).not.toContain(undefined)
    })

    test('no title results in bad request', async () => {
      let testBlogWithNoTitle = testBlog
      testBlogWithNoTitle.title = null
      await api
        .post('/api/blogs')
        .send(testBlogWithNoTitle)
        .set({ Authorization: token })
        .expect(400)

      testBlogWithNoTitle.title = ''
      await api
        .post('/api/blogs')
        .send(testBlogWithNoTitle)
        .set({ Authorization: token })
        .expect(400)
    })

    test('no url results in bad request', async () => {
      let testBlogWithNoUrl = testBlog
      testBlogWithNoUrl.url = null
      await api
        .post('/api/blogs')
        .send(testBlogWithNoUrl)
        .set({ Authorization: token })
        .expect(400)

      testBlogWithNoUrl.url = ''
      await api
        .post('/api/blogs')
        .send(testBlogWithNoUrl)
        .set({ Authorization: token })
        .expect(400)
    })

  })
})


afterAll(() => mongoose.connection.close())
