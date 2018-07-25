const defaultState = {
    isSideDrawerExpanded: true
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'TOGGLE_AUTH_VIEW_SIDE_DRAWER':
            return {...state, isSideDrawerExpanded: !state.isSideDrawerExpanded}
        default: 
            return state
    }
}