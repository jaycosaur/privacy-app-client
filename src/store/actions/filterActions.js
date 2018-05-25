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