const defaultState = {

}

const defaultSearchState = {
    meta: null,
    results: null,
    isLoading: null,
    isError: null,
    error: null
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'FETCH_ALGOLIA_RESULTS_PENDING':
            let { key } = action.meta
            let meta = action.meta
            return {
                ...state,
                [key]: {
                    ...defaultSearchState,
                    ...state[key],
                    meta: meta,
                    isLoading: true
                }
            }
        case 'FETCH_ALGOLIA_RESULTS_FULFILLED':
            let { hits, ...searchMeta } = action.payload
            return {
                ...state,
                [action.meta.key]: {
                    ...state[action.meta.key],
                    isLoading: false,
                    results: hits,
                    searchMeta: searchMeta
                }
            }
        default: 
            return state
    }
}