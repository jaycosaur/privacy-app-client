// Sign Up
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