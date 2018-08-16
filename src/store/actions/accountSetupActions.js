export const progressToNextStep = (currentStepKey) => {
    const stepArray = [
        "lets-setup-your-team",
        "tell-us-about-your-team",
        "team-information",
        "interest-areas",
        "setting-up",
        "complete",
    ]

    const stepIndexNumber = stepArray.findIndex(elem=>(elem===currentStepKey))+1
    
    return {
        type: 'PROGRESS_ACCOUNT_SETUP_STEP',
        payload: {stepKey: stepArray[stepIndexNumber], stepIndexNumber: stepIndexNumber}
    }
}

export const submitCreateNewTeam = () => {
    return {
        type: 'CREATE_NEW_TEAM',
    }
}

export const submitTeamInformation = ({ name, website }) => {
    return {
        type: 'SUBMIT_TEAM_INFORMATION',
        payload: { name, website }
    }
}

export const submitTeamOrganisationType = ({ organisationType }) => {
    return {
        type: 'SUBMIT_TEAM_ORGANISATION_TYPE',
        payload: { organisationType }
    }
}

export const submitTeamInterestCategories = ({ interestCategories }) => {
    return {
        type: 'SUBMIT_TEAM_INTEREST_CATEGORIES',
        payload: { interestCategories }
    }
}