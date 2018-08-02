const defaultState = {
    stage: 0,
    numberOfStages: 3,
    message: "",
    isComplete: false,
    hasFailed: false,
    signedIn: {
        isLoading: false,
        isSuccess: false,
        isFail: false
    },
    accountInformation: {
        isLoading: false,
        isSuccess: false,
        isFail: false
    },
    organisationInformation: {
        isLoading: false,
        isSuccess: false,
        isFail: false
    },

}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'SIGNIN_USER_PENDING':
            return {...state,
                message: "Signing you in",
                signedIn:{
                ...state.signedIn,
                isLoading: true
            }}
        case 'SIGNIN_USER_REJECTED':
            return {...state,
                message: "Failed to Signin User",
                hasFailed: true,
                signedIn:{
                    ...state.signedIn,
                    isLoading: false,
                    isFail: true
            }}
        case 'USER_HAS_SIGNED_IN':
            return {...state, stage: 0.5, signedIn:{
                ...state.signedIn,
                isLoading: false,
                isSuccess: true
            }}
        case 'GET_ACCOUNT_INFORMATION_PENDING':
            return {...state,message: "Getting your details",accountInformation:{
                ...state.accountInformation,
                isLoading: true,
                isSuccess: false
            }}
        case 'GET_ACCOUNT_INFORMATION_FULFILLED':
            return {...state, stage: 1.5,accountInformation:{
                ...state.accountInformation,
                isLoading: false,
                isSuccess: true
            }}
        case 'GET_ORGANISATION_FULL_INFO_PENDING':
            return {...state,message: "Finding your team",organisationInformation:{
                ...state.organisationInformation,
                isLoading: true,
                isSuccess: false
            }}
        case 'GET_ORGANISATION_FULL_INFO_FULFILLED':
            return {...state,  isComplete: true, stage: 3, organisationInformation:{
                ...state.organisationInformation,
                isLoading: false,
                isSuccess: true
            }}
        case 'USER_HAS_NO_ORGANISATION':
            return {...state,  isComplete: true, stage: 3, organisationInformation:{
                ...state.organisationInformation,
                isLoading: false,
                isSuccess: true
            }}
        default: 
            return state
    }
}