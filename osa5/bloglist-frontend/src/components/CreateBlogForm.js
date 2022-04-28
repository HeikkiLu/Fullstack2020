import React, { useState } from 'react'

import Notification from './Notification'
import blogService from '../services/blogs'

const CreateBlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(event)
    const response = await blogService.createBlog(title, author, url, user)
    console.log(response)
    console.log(response.error)
    setMessage(response.error)
    console.log(message)
    setTimeout(() => { setMessage(null) }, 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <Notification message={message} />
      <div>
        Title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        Url: <input type="url" placeholder="https://example.com" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlogForm
