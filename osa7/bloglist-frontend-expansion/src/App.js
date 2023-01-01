import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getUserFromStorage, login, logout } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUserFromStorage())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              id="login-username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button id="login-button" type="submit">
              login
            </button>
          </div>
        </form>
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={user.username} />
      ))}
    </div>
  )
}

export default App
