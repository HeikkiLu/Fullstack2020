import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogFrom from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn()

  render(<BlogFrom createBlog={onSubmit} />)

  const titleInputTxt = 'Blog Title'

  const titleInput = screen.getByPlaceholderText('Title')
  const createBtn = screen.getByText('Create Blog')

  await user.type(titleInput, titleInputTxt)
  await user.click(createBtn)

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit.mock.calls[0][0].title).toBe(titleInputTxt)
})

