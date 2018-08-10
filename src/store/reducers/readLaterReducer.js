const defaultState = {
    items: [],
    records: {},
    createdOn: null,
    lastUpdated: null,
    isFetching: false,
    isLoaded: false,
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'GET_READ_LATER_LIST_PENDING':
            return {
                ...state,
                isFetching: true
            }
        case 'GET_READ_LATER_LIST_FULFILLED':
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
            }
        case 'UPDATE_TO_READ_LATER_LIST':
            return {
                ...state,
                ...action.payload,
                isLoaded: true,
                isFetching: false,
            }
        case 'ADD_TO_READ_LATER_LIST_PENDING':
            return {
                ...state,
                isFetching: true,
                items: [...state.items, {id: action.meta, addedOn: null}]
            }
        case 'REMOVE_FROM_READ_LATER_LIST_PENDING':
            return {
                ...state,
                isFetching: true,
                items: state.items.filter(i=>i.id!==action.meta)
            }
        case 'GET_ITEM_IN_READ_LATER_LIST_PENDING':
            return {
                ...state,
                records: {
                    ...state.records,
                    [action.meta]: {
                        isLoading: true
                    }
                }
            }
        case 'GET_ITEM_IN_READ_LATER_LIST_FULFILLED':
            return {
                ...state,
                records: {
                    ...state.records,
                    [action.meta]: {
                        isLoading: false,
                        ...action.payload
                    }
                }
            }
        default: 
            return state
    }
}

