const defaultState = {
    filters: [],
    keywordInput: null,
    showFilter: true,
    selectedView: 'default'
}

const defaultFilter= {
    isActive: true,
    input: null,
    operation: null,
    field: null
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_FILTER_STATE_TO_DEFAULT':
            return {
                ...state,
                ...defaultState
            }
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
        case 'CHANGE_FILTER_FIELD':
            return {
                ...state,
                filters: [
                    ...state.filters.slice(0, action.payload.filterId),
                    {
                        ...state.filters[action.payload.filterId],
                        field: action.payload.field
                    },
                    ...state.filters.slice(action.payload.filterId + 1)
                ]
            }
        case 'CHANGE_FILTER_OPERATION':
            return {
                ...state,
                filters: [
                    ...state.filters.slice(0, action.payload.filterId),
                    {
                        ...state.filters[action.payload.filterId],
                        operation: action.payload.operation
                    },
                    ...state.filters.slice(action.payload.filterId + 1)
                ]
            }
        case 'CHANGE_FILTER_INPUT':
            return {
                ...state,
                filters: [
                    ...state.filters.slice(0, action.payload.filterId),
                    {
                        ...state.filters[action.payload.filterId],
                        input: action.payload.input
                    },
                    ...state.filters.slice(action.payload.filterId + 1)
                ]
            }
        case 'TOGGLE_FILTER_PANEL':
            return {
                ...state,
                showFilter: !state.showFilter
            }
        case 'CHANGE_SEARCH_PAGE_VIEW':
            const newView = state.selectedView!==action.payload?action.payload:'default'
            return {
                ...state,
                selectedView: newView
            }
        default: 
            return state
    }
}