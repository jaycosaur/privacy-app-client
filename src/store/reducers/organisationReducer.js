const defaultState = {
    isLoading: false,
    hasFetched: false,

}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'GET_ORGANISATION_FULL_INFO_PENDING':
            return {...state, isLoading: true}
        case 'GET_ORGANISATION_FULL_INFO_FULFILLED':
            return {...state, ...action.payload, isLoading: false, hasFetched: true}
        default: 
            return state
    }
}