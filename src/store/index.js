import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers/'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import * as middlewareIndex from './middleware/'


import * as actionManagerMiddleware from './middleware/actionManagerMiddleware'
import * as readLaterMiddleware from './middleware/readLaterMiddleware'
import * as mailingListMiddleware from './middleware/mailingListMiddleware'
import * as organisationMiddleware from './middleware/organisationMiddleware'
import * as searchMiddleware from './middleware/searchMiddleware'


export const history = createBrowserHistory()

const toFn = (mw) => Object.keys(mw).map(i=>mw[i]())

const middleware = applyMiddleware(
    logger, 
    promise(), 
    thunk, 
    routerMiddleware(history),
    ...toFn(middlewareIndex),
    ...toFn(actionManagerMiddleware),
    ...toFn(readLaterMiddleware),
    ...toFn(mailingListMiddleware),
    ...toFn(organisationMiddleware),
    ...toFn(searchMiddleware)
)

export default createStore(connectRouter(history)(reducer), composeWithDevTools(middleware));