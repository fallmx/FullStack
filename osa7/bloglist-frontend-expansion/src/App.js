import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
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
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(newLogin))

      blogService.setToken(newLogin.token)
      setUser(newLogin)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`logged in as ${newLogin.name}`, false, 5))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (blogId, newLikes) => {
    return [blogId, newLikes]
    /*try {
      const likeUpdate = {
        likes: newLikes,
      }

      const modified = await blogService.update(blogId, likeUpdate)

      const newBlogs = blogs.reduce(
        (prev, curr) =>
          curr.id === blogId ? prev.concat(modified) : prev.concat(curr),
        []
      )

      setBlogs(newBlogs)
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(exception.response.data.error, true, 5))
    }*/
  }

  const removeBlog = async (blogId) => {
    return blogId
    /*try {
      await blogService.remove(blogId)

      setBlogs(blogs.filter((b) => b.id !== blogId))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification(exception.response.data.error, true, 5))
    }*/
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
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          loggedUser={user.username}
        />
      ))}
    </div>
  )
}

export default App
