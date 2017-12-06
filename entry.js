import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { createLogger } from 'redux-logger'
import Rx from 'rxjs'
import Typography from 'typography'
import { Scrollbars } from 'react-custom-scrollbars'
import idb from 'idb'

window.React = React
window.ReactDOM = ReactDOM
window.styled = styled
window.ReduxLogger = createLogger
window.ReduxObservable = require('redux-observable')
window.Redux = require('redux')
window.ReactRedux = require('react-redux')
window.Rx = Rx
window.R = require('ramda')
window.Typography = Typography
window.ReactScrollbars = Scrollbars
window.idb = idb

