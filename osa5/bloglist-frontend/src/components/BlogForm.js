import React, { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = e => {
    setNewTitle(e.target.value)
  }
  const handleAuthorChange = e => {
    setNewAuthor(e.target.value)
  }
  const handleUrlChange = e => {
    setNewUrl(e.target.value)
  }
  const addBlog = e => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog} className="blogForm">
      <h2>Create new blog</h2>
      <div>
        Title: <input type="text" value={newTitle} name="Title" onChange={handleTitleChange} placeholder="Title" />
      </div>
      <div>
        Author: <input type="text" value={newAuthor} name="Author" onChange={handleAuthorChange} placeholder="Author" />
      </div>
      <div>
        Url: <input type="url" placeholder="https://example.com" value={newUrl} name="Url" onChange={handleUrlChange} />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default CreateBlogForm
