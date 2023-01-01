import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLikes, removeBlog } from '../reducers/blogReducer'
import '../index.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser }) => {
  const { id, title, author, url, likes, user } = blog
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const fullInfo = () => (
    <div>
      <div>{url}</div>
      <div>
        likes {likes}{' '}
        <button
          className="like-button"
          onClick={() => dispatch(setLikes(id, likes + 1))}
        >
          like
        </button>
      </div>
      <div>{user.name}</div>
    </div>
  )

  const promptRemoveBlog = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      dispatch(removeBlog(id))
    }
  }

  const removeButton = () => <button onClick={promptRemoveBlog}>remove</button>

  return (
    <div className="blog">
      <div>
        {title} {author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && fullInfo()}
      {visible && user.username === loggedUser && removeButton()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string.isRequired,
}

export default Blog
