const defaultState = {
    isSideDrawerExpanded: false,
    isNavHidden: false,
    isSideHidden: false,
    isFullScreen: false,
    isActivityLogHidden: false,
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'TOGGLE_AUTH_VIEW_SIDE_DRAWER':
            return {...state, isSideDrawerExpanded: !state.isSideDrawerExpanded}
        case 'HIDE_NAV_BAR':
            return {...state, isNavHidden: true}
        case 'HIDE_SIDE_BAR':
            return {...state, isSideHidden: true}
        case 'SHOW_FULL_SCREEN':
            return {...state, isFullScreen: true}
        case 'HIDE_FULL_SCREEN':
            return {...state, isFullScreen: false}
        case 'TOGGLE_ACTIVITY_LOG':
            return {...state, isActivityLogHidden: !state.isActivityLogHidden}
        default: 
            return state
    }
}