import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ReduxLogger from 'redux-logger'
import Rx from 'rxjs'
import Typography from 'typography'
import { Scrollbars } from 'react-custom-scrollbars'

window.React = React
window.ReactDOM = ReactDOM
window.styled = styled
window.ReduxLogger = ReduxLogger
window.ReduxObservable = require('redux-observable')
window.Redux = require('redux')
window.ReactRedux = require('react-redux')
window.Rx = Rx
window.R = require('ramda')
window.Typography = Typography
window.ReactScrollbars = Scrollbars
