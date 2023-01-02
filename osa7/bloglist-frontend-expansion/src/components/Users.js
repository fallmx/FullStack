import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
          {users.map((user) => (
            <tr key={user.id.concat('row')}>
              <td key={user.id.concat('name')}>
                <Link to={'/users/'.concat(user.id)}>{user.name}</Link>
              </td>
              <td key={user.id.concat('count')}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
