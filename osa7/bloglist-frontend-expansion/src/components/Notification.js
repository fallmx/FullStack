import { useEffect } from 'react'
import '../index.css'
import PropTypes from 'prop-types'

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
    return <div className="error notification">{message}</div>
  } else {
    return <div className="success notification">{message}</div>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Notification
