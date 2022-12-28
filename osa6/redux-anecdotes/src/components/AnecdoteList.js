import { useSelector, useDispatch } from 'react-redux'
import { setVotes } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
    console.log('vote', id)
    dispatch(setVotes(id, votes + 1))
    dispatch(addNotification(`you voted '${content}'`))
  }

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
