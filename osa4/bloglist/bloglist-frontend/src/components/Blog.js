import { useState } from 'react'
import '../index.css'

const Blog = ({blog, likeBlog}) => {
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

  return (
    <div className="blog">
      <div>
        {title} {author} <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && fullInfo()}
    </div>
  )
}

export default Blog
