const defaultState = {
    digests: {
        digests: {},
        isLoading: false,
        isLoaded: false
    },
    mailingGroups: {
        groups: {},
        isLoading: false,
        isLoaded: false
    }
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'UPDATE_DIGEST':
            return {
                ...state,
                digests: {
                    ...state.digests,
                    digests: {
                        ...state.digests.digests,
                        [action.meta.id]: {
                            ...state.digests.digests[action.meta.id],
                            ...action.payload
                        }
                    }
                }
            }
        case 'UPDATE_MAILING_GROUP':
            return {
                ...state,
                mailingGroups: {
                    ...state.mailingGroups,
                    groups: {
                        ...state.mailingGroups.groups,
                        [action.meta.id]: {
                            ...state.mailingGroups.groups[action.meta.id],
                            ...action.payload
                        }
                    }
                }
            }
        case "DELETE_DIGEST": {
                const { [action.meta.id]:{...digestCon}, ...remDigests} = state.digests.digests
                return {...state, 
                    digests: {
                        ...state.digests,
                        digests: {
                            ...remDigests
                        }
                    }
                }
            }
        case "LOCAL_DELETE_DIGEST": {
                return {...state, 
                    digests: {
                        ...state.digests,
                        digests: {
                            ...state.digests.digests,
                            [action.meta.id]: {
                                ...state.digests.digests[action.meta.id],
                                isDeleting: true
                            }
                        }
                    }
                }
            }
        case "DELETE_MAILING_GROUP": {
                const { [action.meta.id]:{...groupCon}, ...remGroups} = state.mailingGroups.groups
                return {...state, 
                    mailingGroups: {
                        ...state.mailingGroups,
                        groups: {
                            ...remGroups
                        }
                    }
                }
            }
        case "LOCAL_DELETE_MAILING_GROUP": {
                return {...state, 
                    mailingGroups: {
                        ...state.mailingGroups,
                        groups: {
                            ...state.mailingGroups.groups,
                            [action.meta.id]: {
                                ...state.mailingGroups.groups[action.meta.id],
                                isDeleting: true
                            }
                        }
                    }
                }
            }
        default: 
            return state
    }
}

