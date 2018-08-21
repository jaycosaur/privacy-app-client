import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './authReducer'
import popover from './popoverModalReducer'
import filter from './filterReducer'
import news from './newsReducer'
import watchlist from './watchlistReducer'
import view from './viewReducer'
import search from './searchResults'
import organisation from './organisationReducer'
import actionManager from './actionManager'
import loginFlow from './loginFlowReducer'
import readLater from './readLaterReducer'
import mailingList from './mailingListReducer'
import ML from './MLReducer'


import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    user,
    loginFlow,
    news,
    popover,
    filter,
    view,
    watchlist,
    search,
    organisation,
    readLater,
    mailingList,
    ML,
    router: routerReducer,
    form: formReducer,
    actionManager: actionManager
})

export default rootReducer