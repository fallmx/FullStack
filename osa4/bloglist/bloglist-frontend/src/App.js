import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newLogin = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(newLogin)
      )

      blogService.setToken(newLogin.token)
      setUser(newLogin)
      setUsername('')
      setPassword('')
      setError(false)
      setMessage(`logged in as ${newLogin.name}`)
    } catch (exception) {
      console.error(exception)
      setError(true)
      setMessage(exception.response.data.error)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(newBlog))

      setError(false)
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.error(exception)
      setError(true)
      setMessage(exception.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} error={error} setMessage={setMessage} />
        <form onSubmit={handleLogin}>
          <div>username <input value={username} onChange={({target}) => setUsername(target.value)}/></div>
          <div>password <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/></div>
          <div><button type="submit">login</button></div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} setMessage={setMessage} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
