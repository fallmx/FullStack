import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLikes, removeBlog, addComment } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ blog, loggedUser }) => {
  if (!blog) {
    return null
  }

  const { id, title, author, url, likes, comments, user } = blog
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const promptRemoveBlog = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      navigate('/')
      dispatch(removeBlog(id))
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(id, comment))

    setComment('')
  }

  const removeButton = () => <button onClick={promptRemoveBlog}>remove</button>

  return (
    <div>
      <div>
        <h2>
          {title} {author}
        </h2>
        <a href={url}>{url}</a>
        <div>
          likes {likes}{' '}
          <button
            className="like-button"
            onClick={() => dispatch(setLikes(id, likes + 1))}
          >
            like
          </button>
        </div>
        <div>added by {user.name}</div>
      </div>
      {user.username === loggedUser && removeButton()}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <Comments comments={comments} />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string.isRequired,
}

export default Blog
