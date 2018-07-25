export const submitSearchNews = ({query, filters}) => {
    return {
        type: 'GET_SEARCH',
        payload: { 
            filters: null,
            key: 'topnav-search', 
            type: 'MEDIA',
            query,
        }
    }
}

export const globalSearch = ({query, filters, key}) => {
    return {
        type: 'GET_SEARCH',
        payload: { 
            filters: null,
            key: key, 
            query, 
            attrs: {
                hitsPerPage: 20
            },
            saveSearch: false
        }
    }
}