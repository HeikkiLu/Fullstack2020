import React from 'react'

const CreateBlogForm = ({ addBlog, newTitle, newAuthor, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog} className="blogForm">
      <h2>Create new blog</h2>
      <div>
        Title: <input type="text" value={newTitle} name="Title" onChange={handleTitleChange} placeholder="Blog Title" />
      </div>
      <div>
        Author: <input type="text" value={newAuthor} name="Author" onChange={handleAuthorChange} placeholder="Example Author"/>
      </div>
      <div>
        Url: <input type="url" placeholder="https://example.com" value={newUrl} name="Url" onChange={handleUrlChange} />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default CreateBlogForm
