import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './authReducer'
import popover from './popoverModalReducer'
import filter from './filterReducer'
import news from './newsReducer'
import watchlist from './watchlistReducer'
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
    user,
    news,
    popover,
    filter,
    watchlist,
    router: routerReducer,
    form: formReducer
})

export default rootReducer