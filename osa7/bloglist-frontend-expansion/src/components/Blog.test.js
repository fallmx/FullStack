import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      name: 'Jorma Mies',
    },
  }

  test('renders only title and author by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        likeBlog={() => {
          return
        }}
        removeBlog={() => {
          return
        }}
        loggedUser="testimies"
      />
    )

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('This is a title The Author')
    expect(div).not.toHaveTextContent('http://www.website.com/')
    expect(div).not.toHaveTextContent('5')
  })

  test('renders everything when pressed show button', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        likeBlog={() => {
          return
        }}
        removeBlog={() => {
          return
        }}
        loggedUser="testimies"
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('This is a title The Author')
    expect(div).toHaveTextContent('http://www.website.com/')
    expect(div).toHaveTextContent('likes 5')
    expect(div).toHaveTextContent('Jorma Mies')
  })

  test('like function gets called twice if like button pressed twice', async () => {
    const likeHandler = jest.fn()

    render(
      <Blog
        blog={blog}
        likeBlog={likeHandler}
        removeBlog={() => {
          return
        }}
        loggedUser="testimies"
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler).toBeCalledTimes(2)
  })
})
