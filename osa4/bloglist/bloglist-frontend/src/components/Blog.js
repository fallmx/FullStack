import { useState } from 'react'
import '../index.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {
  const { id, title, author, url, likes, user } = blog
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const fullInfo = () => (
    <div>
      <div>{url}</div>
      <div>likes {likes} <button onClick={() => likeBlog(id, likes + 1)}>like</button></div>
      <div>{user.name}</div>
    </div>
  )

  const promptRemoveBlog = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlog(id)
    }
  }

  const removeButton = () => (
    <button onClick={promptRemoveBlog}>remove</button>
  )

  return (
    <div className="blog">
      <div>
        {title} {author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && fullInfo()}
      {visible && user.username === loggedUser && removeButton()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired
}

export default Blog
