import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import React from 'react'
import { cards, substitute } from './layout'
import { MarkupCard } from './markup'
import { bond, Card, Rec, S, U, unpack } from './qd'

const
  markdown = MarkdownIt({ html: true, linkify: true, typographer: true }),
  defaultRenderer = markdown.renderer.rules.text
markdown.renderer.rules.text = (tokens: Token[], idx: U, options: MarkdownIt.Options, env: any, self: Renderer) => {
  const
    linkOpenToken = tokens[idx + 1],
    hrefAttr = linkOpenToken?.attrGet('href')

  // Had to inline the onclick otherwise I would need a global function. Custom event is handled at App.tsx. Return false prevents navigation behavior.
  if (hrefAttr?.startsWith('?')) linkOpenToken.attrPush(['onclick', `window.dispatchEvent(new CustomEvent("md-link-click", {detail:"${hrefAttr.substring(1)}" }));return false`])
  return defaultRenderer!(tokens, idx, options, env, self)
}

export const Markdown = ({ source }: { source: S }) => <div dangerouslySetInnerHTML={{ __html: markdown.render(source) }} />

/**
 * Create a card that renders Markdown content.
 *
 * Github-flavored markdown is supported.
 * HTML markup is allowed in markdown content.
 * URLs, if found, are displayed as hyperlinks.
 * Copyright, reserved, trademark, quotes, etc. are replaced with language-neutral symbols.
 */
interface State {
  /** The title for this card.*/
  title: S
  /** The markdown content. Supports Github Flavored Markdown (GFM): https://guides.github.com/features/mastering-markdown/ */
  content: S
  /** Additional data for the card. */
  data?: Rec
}

export const
  View = bond(({ name, state, changed }: Card<State>) => {
    const
      render = () => {
        const data = unpack(state.data)
        return (
          <MarkupCard
            name={name}
            title={substitute(state.title, data)}
            content={markdown.render(substitute(state.content, data))}
          />
        )
      }
    return { render, changed }
  })

cards.register('markdown', View)