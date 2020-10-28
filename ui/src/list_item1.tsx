import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Format } from './layout'
import { bond, Card, unpack, Rec, S } from './qd'
import { clas, cssVar } from './theme'

const
  css = stylesheet({
    item: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    left: {
      flexDirection: 'column',
    },
    right: {
      flexDirection: 'column',
    },
    caption: {
      color: cssVar('text5'),
    },
    aux_value: {
      color: cssVar('text5'),
    },
  })

/** EXPERIMENTAL. DO NOT USE. */
interface State {
  /** EXPERIMENTAL. DO NOT USE. */
  title: S
  /** EXPERIMENTAL. DO NOT USE. */
  caption: S
  /** EXPERIMENTAL. DO NOT USE. */
  value: S
  /** EXPERIMENTAL. DO NOT USE. */
  aux_value: S
  /** EXPERIMENTAL. DO NOT USE. */
  data: Rec
}

const defaults: Partial<State> = {
  title: 'Untitled',
}

export const
  View = bond(({ name, state, changed }: Card<State>) => {
    const
      render = () => {
        const
          s = { ...defaults, ...state },
          data = unpack(s.data)

        return (
          <div data-test={name} className={css.item}>
            <div className={css.left}>
              <Format data={data} format={s.title} className='s12 w6' />
              <Format data={data} format={s.caption} className={clas(css.caption, 's13')} />
            </div>
            <div className={css.right}>
              <Format data={data} format={s.value} className='s12' />
              <Format data={data} format={s.aux_value} className={clas(css.aux_value, 's13')} />
            </div>
          </div>
        )
      }
    return { render, changed }
  })

cards.register('list_item1', View)