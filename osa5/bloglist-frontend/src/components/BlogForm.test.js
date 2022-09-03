import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogFrom from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForrm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogFrom createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('Blog Title')
  const creteBtn = screen.getByText('Create Blog')

  await user.type(input, 'Test Blog')
  await user.click(creteBtn)

  expect(createBlog).toHaveBeenCalled() // fails but why
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
})
