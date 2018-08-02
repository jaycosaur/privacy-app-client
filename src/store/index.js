import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers/'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import * as middlewareIndex from './middleware/'


import * as actionManagerMiddleware from './middleware/actionManagerMiddleware'

export const history = createHistory()

const toFn = (mw) => Object.keys(mw).map(i=>mw[i]())

const middleware = applyMiddleware(
    logger, 
    promise(), 
    thunk, 
    ...toFn(middlewareIndex),
    ...toFn(actionManagerMiddleware)
)

export default createStore(reducer, composeWithDevTools(middleware));