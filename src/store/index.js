import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers/'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import {fetchLegislationItems, fetchNewsItems, getWatchlistItem, policySearchMiddleware, createPolicyWatchMiddleware, getWatchlistItems, saveNewsSettingMiddleware, getNewsSettingItems, deleteWatchlistItem} from './middleware/'

export const history = createHistory()
const middleware = applyMiddleware(
    logger, 
    promise(), 
    thunk, 
    routerMiddleware(history), 
    policySearchMiddleware(), 
    createPolicyWatchMiddleware(), 
    getWatchlistItems(),
    saveNewsSettingMiddleware(),
    getNewsSettingItems(),
    deleteWatchlistItem(),
    getWatchlistItem(),
    fetchNewsItems(),
    fetchLegislationItems())

export default createStore(reducer, composeWithDevTools(middleware));