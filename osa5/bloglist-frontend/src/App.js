import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogFormRef = React.createRef()

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification('wrong username or password', 'error')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload(false)
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      blogService.createBlog(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          handleNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
        })
    } catch (exception) {
      console.log(exception)
      handleNotification('Something went wrong', 'error')
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const likeBlog = (id) => {
    const likes = blogs.find(blog => blog.id === id).likes + 1
    const blog = {
      likes: likes
    }
    blogService.updateBlog(id, blog)
    setBlogs(blogs.map(blog => blog.id === id ? { ...blog, likes: likes } : blog))
  }

  const removeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      handleNotification(`Blog ${blog.title} by ${blog.author} removed`, 'success')
    }
  }

  const handleNotification = (message, type) => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <Notification type={notification.type} message={notification.message} />
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>

      <div>
        <Notification type={notification.type} message={notification.message} />
        <Togglable buttonLabel="Create new blog" cancelButtonLabel="Cancel" ref={blogFormRef}>
          <CreateBlogForm addBlog={addBlog} newAuthor={newAuthor} newTitle={newTitle} newUrl={newUrl} handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange} handleUrlChange={handleUrlChange} />
        </Togglable>
      </div>

      {
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
        )}
    </div>
  )
}

export default App
