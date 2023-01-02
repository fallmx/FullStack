import { useEffect, useState } from 'react'
//import { useSelector } from 'react-redux'
import userService from '../services/users'

const User = () => {
  //const blogs = useSelector((state) => state.blogs)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService.getAll().then((data) => {
      setUsers(data)
    })
  }, [])

  if (!users) {
    return null
  }

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
              <td key={user.id.concat('name')}>{user.name}</td>
              <td key={user.id.concat('count')}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
