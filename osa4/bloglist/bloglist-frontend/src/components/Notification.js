import { useEffect } from 'react'
import '../index.css'

const Notification = ({ message, error, setMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => clearTimeout(timer)
  })

  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div className="error notification">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="success notification">
        {message}
      </div>
    )
  }
}

export default Notification
