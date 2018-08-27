const defaultState = {
    isLoading: false,
    hasFetched: false,
}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'SUBMIT_TEAM_INFORMATION':{
            return {
                ...state,
                newTeamInfo: {
                    ...state.newTeamInfo,
                    ...action.payload
                }
            }
        }
        case 'SUBMIT_TEAM_ORGANISATION_TYPE':{
            return {
                ...state,
                newTeamInfo: {
                    ...state.newTeamInfo,
                    ...action.payload
                }
            }
        }
        case 'SUBMIT_TEAM_INTEREST_CATEGORIES':{
            return {
                ...state,
                newTeamInfo: {
                    ...state.newTeamInfo,
                    ...action.payload
                }
            }
        }
        case 'CREATE_NEW_TEAM_PENDING':{
            return {
                ...state,
                creatingNewOrganisation: true,
            }
        }
        case 'CREATE_NEW_TEAM_FULFILLED':{
            return {
                ...state,
                creatingNewOrganisation: false,
                createNewOrganisationSuccess: true,
                newOrganisationId: action.payload.organisationId
            }
        }
        case 'CREATE_NEW_TEAM_REJECTED':{
            return {
                ...state,
                creatingNewOrganisation: false,
                createNewOrganisationError: action.payload
            }
        }
        case 'GET_ORGANISATION_FULL_INFO_PENDING':
            return {...state, isLoading: true}
        case 'GET_ORGANISATION_FULL_INFO_FULFILLED':
            return {...state, ...action.payload, isLoading: false, hasFetched: true}
        case 'SIGNUP_TO_ORGANISATION_VIA_TOKEN_PENDING':
            return {...state, isJoiningOrganisation: true}
        case 'SIGNUP_TO_ORGANISATION_VIA_TOKEN_FULFILLED':
            return {...state, isJoiningOrganisation: false, hasJoinedOrganisation: true, organisationId: action.payload.organisationId}
        case 'SIGNUP_TO_ORGANISATION_VIA_TOKEN_REJECTED':
            return {...state, isJoiningOrganisation: false, organisationJoinRejected: true, rejectionMessage: action.payload}
        case 'PROMOTE_USER_TO_ADMIN_PENDING': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isPromoting: true
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
            
        case 'PROMOTE_USER_TO_ADMIN_FULFILLED': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isPromoting: false,
                    isAdmin: true
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
        case 'PROMOTE_USER_TO_ADMIN_REJECTED': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isPromoting: false
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
            
        case 'REMOVE_USER_FROM_ORGANISATION_PENDING': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isDeleting: true
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
            
        case 'REMOVE_USER_FROM_ORGANISATION_FULFILLED': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isDeleting: false,
                    isDeleted: true
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
        case 'REMOVE_USER_FROM_ORGANISATION_REJECTED': 
            return {...state, users: [
                ...state.users.slice(0, state.users.map(i=>i.userId).indexOf(action.meta.uid)),
                {
                    ...state.users[state.users.map(i=>i.userId).indexOf(action.meta.uid)],
                    isDeleting: false
                },
                ...state.users.slice(state.users.map(i=>i.userId).indexOf(action.meta.uid)+1),
            ]}
        // listeners for organisation document changes 
        case "SUBSCRIBE_ORGANISATION_INFORMATION_OPEN": {
            return {...state, 
                isSubscribedOrganisationInformation: true,
                isLoadingOrganisationInformation: true,
            }
        }
        case "NO_ORGANISATION_INFORMATION": {
            return {...state, 
                isLoadingOrganisationInformation: false,
                isLoading: false, hasFetched: true
            }
        }
        case "UPDATE_ORGANISATION_INFORMATION_IN_STORE": {
            return {...state, 
                isLoading: false, hasFetched: true,
                ...action.payload}
        }
        // listeners for organisation user changes
        case "SUBSCRIBE_ORGANISATION_USERS_OPEN": {
            return {...state, 
                isSubscribedOrganisationUsers: true,
                isLoadingOrganisationUsers: true,
            }
        }
        case "NO_ORGANISATION_USERS": {
            return {...state, 
                isLoadingOrganisationUsers: false,
            }
        }
        case "UPDATE_ORGANISATION_USERS_IN_STORE": {
            return {
                ...state,
                isLoadingOrganisationUsers: false,
                users: [...action.payload.users],
                isCurrentUserAdmin: action.payload.isCurrentUserAdmin
            }
        }
        // listeners for organisation pending-user changes
        case "SUBSCRIBE_ORGANISATION_PENDING_USERS_OPEN": {
            return {...state, 
                isSubscribedOrganisationPendingUsers: true,
                isLoadingOrganisationPendingUsers: true,
            }
        }
        case "NO_ORGANISATION_PENDING_USERS": {
            return {...state, 
                isLoadingOrganisationPendingUsers: false,
            }
        }
        case "UPDATE_ORGANISATION_PENDING_USERS_IN_STORE": {
            return {
                ...state,
                isLoadingOrganisationPendingUsers: false,
                pendingUsers: [...action.payload]
            }
        }
        case "INVITE_USER_TO_ORGANISATION_PENDING": {
            return {
                ...state,
                pendingUsers: state.pendingUsers?[...state.pendingUsers, {id: action.meta.email, email: action.meta.email, isSending: true}]:[{id: action.meta.email, email: action.meta.email, isSending: true}]
            }
        }
        case "INVITE_USER_TO_ORGANISATION_FULFILLED": {
            return {
                ...state,
                pendingUsers: [...state.pendingUsers.filter(i=>i.id!==action.meta.email)]
            }
        }
        case "REVOKE_INVITE_USER_TO_ORGANISATION_PENDING": {
            return {
                ...state,
                pendingUsers: [...state.pendingUsers.filter(i=>i.id!==action.meta.id), ...state.pendingUsers.filter(i=>i.id===action.meta.id).map(i=>({...i, isDeleting: true}))]
            }
        }
        case "REVOKE_INVITE_USER_TO_ORGANISATION_FULFILLED": {
            return {
                ...state,
                pendingUsers: [...state.pendingUsers.filter(i=>i.id!==action.meta.id)]
            }
        }
        case "LEAVE_ORGANISATION_FLOW_PENDING": {
            return {
                ...state,
                isLeavingOrganisation: true
            }
        }
        case "LEAVE_ORGANISATION_FLOW_PENDING": {
            return {
                ...state,
                isLeavingOrganisation: false,
                hasLeftOrganisation: true
            }
        }
        case "CREATE_NEW_TEAM_FROM_FIELDS_PENDING": {
            return {
                ...state,
                isSubmittingCreateTeam: true
            }
        }
        case "CREATE_NEW_TEAM_FROM_FIELDS_FULFILLED": {
            return {
                ...state,
                isSubmittingCreateTeam: false,
                hasCreatedNewTeam: true,
                newOrganisationId: action.payload.organisationId
            }
        }
        default: 
            return state
    }
}