import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Markdown } from './markdown'

describe('Markdown.tsx', () => {

  // Jest JSDOM does not support event system, so we can only check if the event was dispatched.
  it('Dispatches a custom event when link prefixed with "?"', () => {
    const dispatchEventMock = jest.fn()
    window.dispatchEvent = dispatchEventMock
    const { getByText } = render(<Markdown source='The quick brown [fox](?fox) jumps over the lazy [dog](dog).' />)

    fireEvent.click(getByText('fox'))
    expect(dispatchEventMock).toHaveBeenCalled()

    dispatchEventMock.mockClear()
    fireEvent.click(getByText('dog'))
    expect(dispatchEventMock).not.toHaveBeenCalled()
  })
})