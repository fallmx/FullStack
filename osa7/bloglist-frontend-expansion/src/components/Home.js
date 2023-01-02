import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import '../index.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <div key={blog.id.concat('div')} className="blog">
          <Link key={blog.id} to={'/blogs/'.concat(blog.id)}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
