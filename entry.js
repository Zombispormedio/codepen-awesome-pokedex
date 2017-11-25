import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ReduxLogger from 'redux-logger'
import ReduxSaga from 'redux-saga'
import Typography from 'typography'
import { Scrollbars } from 'react-custom-scrollbars'

window.React = React
window.ReactDOM = ReactDOM
window.styled = styled
window.ReduxLogger = ReduxLogger
window.ReduxSaga = ReduxSaga
window.Redux = require('redux')
window.ReactRedux = require('react-redux')
window.R = require('ramda')
window.Typography = Typography
window.ReactScrollbars = Scrollbars
