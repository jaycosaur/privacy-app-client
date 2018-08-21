const defaultState = {
    summarise: {
        isLoading: false,
        summary: {}
    },
    spam: {
        isLoading: false
    },
    tag: {
        isLoading: false

    }
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {
                ...defaultState,
            }
        case 'ML_NEWS_SUMMARISE_PENDING' :
            return {
                ...state,
                summarise: {
                    ...state.summarise,
                    isLoading: true
                }
            }
        case 'ML_NEWS_SUMMARISE_FULFILLED' :
            return {
                ...state,
                summarise: {
                    ...state.summarise,
                    isLoading: false,
                    ...action.payload,
                }
            }
        case 'ML_IS_NEWS_SPAM_PENDING' :
            return {
                ...state,
                spam: {
                    ...state.spam,
                    isLoading: true
                }
            }
        case 'ML_IS_NEWS_SPAM_FULFILLED' :
            return {
                ...state,
                spam: {
                    ...state.spam,
                    isLoading: false,
                    ...action.payload,
                }
            }
        case 'ML_AUTO_TAG_FROM_TITLE_PENDING' :
            return {
                ...state,
                tag: {
                    ...state.tag,
                    isLoading: true
                }
            }
        case 'ML_AUTO_TAG_FROM_TITLE_FULFILLED' :
            return {
                ...state,
                tag: {
                    ...state.tag,
                    isLoading: false,
                    ...action.payload,
                }
            }
        default: 
            return state
    }
}