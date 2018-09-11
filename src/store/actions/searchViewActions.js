export const handleRowSelect = (id) => {
    return ({
        type: "HANDLE_ITEM_SELECT_IN_SEARCH_TABLE",
        payload: { id }
    })
}

export const handleRequestSort = ({order, orderBy}) => {
    return ({
        type: "HANDLE_REQUEST_SORT_SEARCH_TABLE",
        payload: { order, orderBy }
    })
}

export const handleRowClearSelected = () => {
    return ({
        type: "HANDLE_ROW_CLEAR_SELECTED_SEARCH_TABLE",
    })
}



