export const getWatchlistItems = (item) => {
    return {
        type: 'FETCH_WATCHLIST_ITEMS',
    }
}

export const deleteWatchlistItem = (id) => {
    return {
        type: 'DELETE_WATCHLIST_ITEM',
        meta: id
    }
}
