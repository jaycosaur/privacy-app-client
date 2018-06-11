const defaultState = {
    searchTags: [],
    isSaving: false,
    isFetching: false,
    isUnsaved: false,
    lastUpdate: null,
    receiveEmailAlerts: false,
    isFetchingRss: false,
    rssItems: []
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'HANDLE_TAG_CHANGE':
            return {
                ...state,
                searchTags:[...action.payload],
                isUnsaved: true
            }
        case 'SAVE_NEWS_SETTINGS_PENDING':
            return {
                ...state,
                isSaving: true
            }
        case 'SAVE_NEWS_SETTINGS_FULFILLED':
            return {
                ...state,
                isSaving: false,
                isUnsaved: false
            }
        case 'SAVE_NEWS_SETTINGS_REJECTED':
            return {
                ...state,
                isSaving: false
            }
        case 'FETCH_NEWS_SETTINGS_PENDING':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_NEWS_SETTINGS_FULFILLED':
            return {
                ...state,
                isFetching: false,
                ...action.payload
            }
        case 'FETCH_NEWS_SETTINGS_REJECTED':
            return {
                ...state,
                isFetching: false
            }
        case 'FETCH_NEWS_RSS_PENDING':
            return {
                ...state,
                isFetchingRss: true
            }
        case 'FETCH_NEWS_RSS_FULFILLED':
            return {
                ...state,
                isFetchingRss: false,
                rssItems: [...action.payload]
            }
        case 'FETCH_NEWS_RSS_REJECTED':
            return {
                ...state,
                isFetchingRss: false
            }
        case 'FETCH_NEWS_ITEMS_PENDING':
            return {
                ...state,
                isFetchingRss: true
            }
        case 'FETCH_NEWS_ITEMS_FULFILLED':
            return {
                ...state,
                isFetchingRss: false,
                rssItems: [...action.payload.hits]
            }
        case 'FETCH_NEWS_ITEMS_REJECTED':
            return {
                ...state,
                isFetchingRss: false
            }
        default: 
            return state
    }
}