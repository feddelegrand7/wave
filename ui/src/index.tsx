import { initializeIcons, loadTheme } from '@fluentui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import './cards'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { fluentPalettes } from "./theme"

loadTheme({
  defaultFontStyle: { fontFamily: 'Inter' },
  palette: fluentPalettes.light
})

// Initialize Fluent icons
initializeIcons()

ReactDOM.render(<Router />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
