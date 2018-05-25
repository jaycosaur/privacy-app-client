const defaultState = {
    isShowing: false,
    selectedModal: null
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'CLOSE_MODAL':
            return {...state, isShowing: false, selectedModal: null}
        case 'MODAL_SELECT_ITEM':
            return {...state, isShowing: true, selectedModal: action.payload}
        default: 
            return state
    }
}