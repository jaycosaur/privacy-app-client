export const clearSearchFilter = () => {
    return {
        type: "CLEAR_SEARCH_FILTER"
    }
}

export const updateSearchFilter = (text) => {
    return {
        type: "UPDATE_SEARCH_FILTER",
        payload: text
    }
}

export const addNewFilter = () => {
    return {
        type: 'ADD_NEW_FILTER',
    }
}

export const removeFilter = (filterId) => {
    return {
        type: 'REMOVE_FILTER',
        payload: filterId
    }
}

export const handleFilterFieldChange = (filterId, field) => {
    return {
        type: 'CHANGE_FILTER_FIELD',
        payload: {filterId, field}
    }
}

export const handleFilterOperationChange = (filterId, operation) => {
    return {
        type: 'CHANGE_FILTER_OPERATION',
        payload: {filterId, operation}
    }
}

export const handleFilterInputChange = (filterId, input) => {
    return {
        type: 'CHANGE_FILTER_INPUT',
        payload: {filterId, input}
    }
}

export const getFacetValues = (type) => {
    return {
        type: 'SEARCH_FOR_FACET_VALUES',
        payload: { facet: type }
    }
}



export const handleKeywordInputChange = (item) => {
    return {
        type: 'KEYWORD_INPUT_CHANGE',
        payload: item
    }
}

export const submitPolicySearch = () => {
    return {
        type: 'SUBMIT_POLICY_SEARCH'
    }
}

export const createPolicyWatch = (data) => {
    return {
        type: 'CREATE_POLICY_WATCH'
    }
}

export const toggleFilterPanel = () => {
    return {
        type: 'TOGGLE_FILTER_PANEL'
    }
}

export const changeSearchPageView = (view) => {
    return {
        type: 'CHANGE_SEARCH_PAGE_VIEW',
        payload: view
    }
}