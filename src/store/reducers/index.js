import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './authReducer'
import popover from './popoverModalReducer'
import filter from './filterReducer'

const rootReducer = combineReducers({
    user,
    popover,
    filter,
    router: routerReducer
})

export default rootReducer