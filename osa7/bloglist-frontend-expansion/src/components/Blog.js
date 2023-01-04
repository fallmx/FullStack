import { useDispatch } from 'react-redux'
import { setLikes, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ blog, loggedUser }) => {
  const { id, title, author, url, likes, comments, user } = blog

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const promptRemoveBlog = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      navigate('/')
      dispatch(removeBlog(id))
    }
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
      <Comments comments={comments}/>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string.isRequired,
}

export default Blog
