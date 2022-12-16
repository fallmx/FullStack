import { useState, useEffect, useInsertionEffect } from 'react'
import Blog from './components/Blog'
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
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      
      setBlogs(blogs.concat(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error(exception.message)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>username <input value={username} onChange={({target}) => setUsername(target.value)}/></div>
          <div>password <input value={password} onChange={({target}) => setPassword(target.value)}/></div>
          <div><button type="submit">login</button></div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title: <input value={title} onChange={({target}) => setTitle(target.value)}/></div>
        <div>author: <input value={author} onChange={({target}) => setAuthor(target.value)}/></div>
        <div>url: <input value={url} onChange={({target}) => setUrl(target.value)}/></div>
        <div><button type="submit">create</button></div>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
