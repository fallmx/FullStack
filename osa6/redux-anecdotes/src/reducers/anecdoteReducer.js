import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const { id, newObject } = action.payload
      return state.map(a => a.id === id ? newObject : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote, setAnecdotes, pushAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(pushAnecdote(newAnecdote))
  }
}

export const setVotes = (id, newVotes) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const toVote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...toVote,
      votes: newVotes
    }
    const newObject = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote({ id, newObject }))
  }
}

export default anecdoteSlice.reducer
