export const handleTagChange = (payload) => {
    return {
        type: 'HANDLE_TAG_CHANGE',
        payload: payload
    }
}

export const saveNewsSettings = (payload) => {
    return {
        type: 'SAVE_NEWS_SETTINGS',
    }
}

export const fetchNewsSettings = (payload) => {
    return {
        type: 'FETCH_NEWS_SETTINGS',
    }
}

