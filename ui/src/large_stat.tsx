import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Format } from './layout'
import { bond, Card, Rec, S } from './qd'
import { clas } from './theme'

const
  css = stylesheet({
    aux_value: {
      color: 'var(--text6)',
    },
    caption: {
      color: 'var(--text5)',
    }
  })

/** Create a stat card displaying a primary value, an auxiliary value and a caption. */
interface State {
  /** The card's title. */
  title: S
  /** The primary value displayed. */
  value: S
  /** The auxiliary value displayed next to the primary value. */
  aux_value: S
  /** The caption displayed below the primary value. */
  caption: S
  /** Data for this card. */
  data?: Rec
}

export const
  View = bond(({ name, state: s, changed }: Card<State>) => {
    const render = () => (
      <Fluent.Stack data-test={name}>
        <Format data={s.data} format={s.title} className='s12 w6' />
        <Fluent.Stack horizontal verticalAlign='baseline' tokens={{ childrenGap: 5 }}>
          <Format data={s.data} defaultValue={s.value} format={s.value} className='s40 w2' />
          <Format data={s.data} format={s.aux_value} className={css.aux_value} />
        </Fluent.Stack>
        <Format data={s.data} format={s.caption} className={clas(css.caption, 's13')} />
      </Fluent.Stack>
    )

    return { render, changed }
  })

cards.register('large_stat', View)