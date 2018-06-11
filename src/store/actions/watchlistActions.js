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
