import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a=> a.id === id)
      anecdoteToVote.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, setAnecdotes, pushAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(pushAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
