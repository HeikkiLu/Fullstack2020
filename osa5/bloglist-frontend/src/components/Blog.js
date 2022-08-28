import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View" cancelButtonLabel="Hide">
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button></p>
        <p>{blog.user.name}</p>
        {
          // Eventho username is unique, id would be the best for identifying the users blogs.
          blog.user.username === user.username ? <button onClick={() => removeBlog(blog.id)}>Remove</button> : null
        }
      </Togglable>
    </div>
  )
}

export default Blog
