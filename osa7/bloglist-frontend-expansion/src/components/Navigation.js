import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const padding = {
    padding: 5
  }

  return (
    <div className="navigation">
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      {' '}{user.name} logged in{' '}
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navigation
