import React from 'react'

const CreateBlogForm = ({ addBlog, newTitle, newAuthor, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <div>
        Title: <input type="text" value={newTitle} name="Title" onChange={handleTitleChange} />
      </div>
      <div>
        Author: <input type="text" value={newAuthor} name="Author" onChange={handleAuthorChange} />
      </div>
      <div>
        Url: <input type="url" placeholder="https://example.com" value={newUrl} name="Url" onChange={handleUrlChange} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlogForm
