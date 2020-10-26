import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Format } from './layout'
import { bond, Card, unpack, Rec, S } from './qd'
import { font, cssVar } from './theme'

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
    title: {
      ...font.s12,
      ...font.w6,
    },
    caption: {
      ...font.s13,
      color: cssVar('text5'),
    },
    value: {
      ...font.s12,
    },
    aux_value: {
      ...font.s13,
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
              <Format data={data} format={s.title} className={css.title} />
              <Format data={data} format={s.caption} className={css.caption} />
            </div>
            <div className={css.right}>
              <Format data={data} format={s.value} className={css.value} />
              <Format data={data} format={s.aux_value} className={css.aux_value} />
            </div>
          </div>
        )
      }
    return { render, changed }
  })

cards.register('list_item1', View)