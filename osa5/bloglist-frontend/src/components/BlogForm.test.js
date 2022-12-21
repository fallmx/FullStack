import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('blog form calls callback with proper data', async () => {
    const createBlog = jest.fn()

    const { container } = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = container.querySelector('#form-title')
    const author = container.querySelector('#form-author')
    const url = container.querySelector('#form-url')
    const submit = container.querySelector('#form-submit')

    const user = userEvent.setup()
    await user.type(title, 'Tämä on title')
    await user.type(author, 'The Author')
    await user.type(url, 'http://www.website.com/')
    await user.click(submit)

    const callbackData = createBlog.mock.calls[0][0]

    expect(callbackData.title).toBe('Tämä on title')
    expect(callbackData.author).toBe('The Author')
    expect(callbackData.url).toBe('http://www.website.com/')
  })
})
