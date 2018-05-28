const defaultState = {
    searchTags: [],
    isSaving: false,
    isFetching: false,
    isUnsaved: false,
    lastUpdate: null,
    receiveEmailAlerts: false,
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
        default: 
            return state
    }
}