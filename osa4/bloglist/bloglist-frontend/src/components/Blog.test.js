import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '639cc52b5afc276fce9725a1',
    title: 'This is a title',
    author: 'The Author',
    url: 'http://www.website.com/',
    likes: 5,
    user: {
      id: '6397c7f048efbb01356642be',
      username: 'jorma',
      name: 'Jorma Mies'
    }
  }

  test('renders only title and author by default', () => {
    const { container } = render(
      <Blog blog={blog} likeBlog={() => { return }} removeBlog={() => { return }} loggedUser="testimies" />
    )

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('This is a title The Author')
    expect(div).not.toHaveTextContent('http://www.website.com/')
    expect(div).not.toHaveTextContent('5')
  })
})