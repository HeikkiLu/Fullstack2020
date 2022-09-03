import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 66,
    user: {
      name: 'Test name',
      username: 'TestUsername'
    }
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText('Test title Test author')
  expect(element).toBeDefined()
})

test('renders blog with url and likes', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 66,
    user: {
      name: 'Test name',
      username: 'TestUsername'
    }
  }

  const userObj = {
    username: 'notBlogOwner'
  }

  const mockHandler = jest.fn()

  render ( <Blog blog={blog} user={userObj} removeBlog={mockHandler} /> )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('Test url')).toBeDefined()
  expect(screen.getByText('66 likes')).toBeDefined()
  expect(screen.getByText('Test name')).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 66,
    user: {
      name: 'Test name',
      username: 'TestUsername'
    }
  }
  const userObj = {
    username: 'notBlogOwner'
  }
  const mockHandler = jest.fn()

  render ( <Blog blog={blog} user={userObj} likeBlog={mockHandler} /> )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

