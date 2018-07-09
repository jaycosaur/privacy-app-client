export const progressToNextStep = (currentStepKey) => {
    const stepArray = [
        "lets-setup-your-account",
        "tell-us-about-yourself",
        "organisation-information",
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