const defaultState = {
    watchlistItems: [],
    isSaving: false,
    isFetching: false,
    isUnsaved: false,
    lastUpdate: null,
    receiveEmailAlerts: false,
    isDeleting: false,
    isCreatingWatchlist: false
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'FETCH_WATCHLIST_ITEMS_PENDING':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_WATCHLIST_ITEMS_FULFILLED':
            return {
                ...state,
                isFetching: false,
                watchlistItems: [...action.payload]
            }
        case 'FETCH_WATCHLIST_ITEMS_REJECTED':
            return {
                ...state,
                isFetching: false
            }
        case 'DELETE_WATCHLIST_ITEM_PENDING':
            return {
                ...state,
                isDeleting: action.meta
            }
        case 'DELETE_WATCHLIST_ITEM_FULFILLED':
            return {
                ...state,
                isDeleting: false,
                watchlistItems: [...state.watchlistItems.filter(i => i.id!==action.meta)]
            }
        case 'DELETE_WATCHLIST_ITEM_REJECTED':
            return {
                ...state,
                isDeleting: false
            }
        case 'CREATE_POLICY_WATCH_PENDING':
            return {
                ...state,
                isCreatingWatchlist: true
            }
        case 'CREATE_POLICY_WATCH_FULFILLED':
            return {
                ...state,
                isCreatingWatchlist: false
            }
        default: 
            return state
    }
}