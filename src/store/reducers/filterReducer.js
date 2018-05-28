const defaultState = {
    filters: [],
    keywordInput: null
}

const defaultFilter= {
    isActive: true,
    type: null,
    operation: null,
    field: null
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'ADD_NEW_FILTER':
            return {
                ...state,
                filters:[...state.filters, defaultFilter]
            }
        case 'REMOVE_FILTER':
            return {
                ...state,
                filters: [...state.filters.slice(0, action.payload),...state.filters.slice(action.payload + 1)]
            }
        case 'KEYWORD_INPUT_CHANGE':
            return {
                ...state,
                keywordInput: action.payload
            }
        default: 
            return state
    }
}