import { createSlice } from "@reduxjs/toolkit"

const initialState = 'tämä on notification'

const notificationSlice = createSlice({
    name: 'notification',
    initialState
})

export default notificationSlice.reducer
