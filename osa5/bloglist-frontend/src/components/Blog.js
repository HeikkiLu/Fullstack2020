import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      { visible && (
        <div className='blogInfo'>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button></p>
          <p>{blog.user.name}</p>
          {
            (user && blog.user.username === user.username) ? <button onClick={() => removeBlog(blog.id)}>Remove</button> : null
          }
        </div>
      )
      }
    </div>
  )
}

export default Blog
