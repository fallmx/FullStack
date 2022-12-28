import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {message: null, timerId: null},
  reducers: {
    changeNotificationMessage(state, action) {
      state.message = action.payload
    },
    removeNotification(state, action) {
      state.message = null
    },
    setTimerId(state, action) {
      state.timerId = action.payload
    },
    stopTimer(state, action) {
      clearTimeout(state.timerId)
    }
  }
})

export const { changeNotificationMessage, removeNotification, setTimerId, stopTimer } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(stopTimer())
    dispatch(changeNotificationMessage(message))
    const timer = setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
    dispatch(setTimerId(timer))
  }
}

export default notificationSlice.reducer
