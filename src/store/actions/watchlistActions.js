export const getWatchlistItems = () => {
    return {
        type: 'FETCH_WATCHLIST_ITEMS',
    }
}

export const getWatchlistItem = (watchlistId) => {
    return {
        type: 'FETCH_WATCHLIST_ITEM',
        meta: watchlistId
    }
}

export const clearFilterData = () => {
    return {
        type: 'RESET_FILTER_STATE_TO_DEFAULT'
    }
}

export const deleteWatchlistItem = (id) => {
    return {
        type: 'DELETE_WATCHLIST_ITEM',
        meta: id
    }
}

export const getReadLaterList = () => {
    return {
        type: 'GET_READ_LATER_LIST'
    }
}

export const getItemInReadLaterList = (id) => {
    return {
        type: 'GET_ITEM_IN_READ_LATER_LIST',
        payload: id
    }
}

export const saveToReadLaterList = (id) => {
    return {
        type: 'ADD_TO_READ_LATER_LIST',
        payload: id
    }
}

export const removeFromReadLaterList = (id) => {
    return {
        type: 'REMOVE_FROM_READ_LATER_LIST',
        payload: id
    }
}
