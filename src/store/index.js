import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers/'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()
const middleware = applyMiddleware(logger, promise(), thunk, routerMiddleware(history))

export default createStore(reducer, composeWithDevTools(middleware));