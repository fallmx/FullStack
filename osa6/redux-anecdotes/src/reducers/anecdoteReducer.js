import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a=> a.id === id)
      anecdoteToVote.votes += 1
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
        return action.payload
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes, pushAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
