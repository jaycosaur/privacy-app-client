const defaultState = {
    isShowing: false,
    selectedModal: null,
    selectedModalFields: {},
    isLoading: false
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'CLOSE_MODAL':
            return {...state, isShowing: false, selectedModal: null}
        case 'MODAL_SELECT_ITEM':
            return {...state, isShowing: true, selectedModal: action.payload}
        case 'HANDLE_ACCOUNT_FORM_FIELD_CHANGE':
            return {...state, selectedModalFields: {
                ...state.selectedModalFields,
                [action.payload.key]: action.payload.value
            }}
        case 'UPDATE_ACCOUNT_INFORMATION_PENDING': 
            return {...state, isLoading: true}
        case 'UPDATE_ACCOUNT_INFORMATION_FULFILLED': 
            return {...state, isLoading: false, isShowing: false}
        case 'UPDATE_ORGANISATION_INFO_PENDING': 
            return {...state, isLoading: true}
        case 'UPDATE_ORGANISATION_INFO_FULFILLED': 
            return {...state, isLoading: false, isShowing: false}
        default: 
            return state
    }
}