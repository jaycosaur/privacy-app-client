export const createProjectInManager = (val) => {
    return {
        type: 'CREATE_PROJECT_IN_MANAGER',
        payload: {
            title: val.title,
            description: val.description,
        }
    }
}

export const openCreateProjectsInManagerDialogue = () => {
    return {
        type: 'OPEN_CREATE_PROJECTS_IN_MANAGER_DIALOGUE',
    }
}

export const closeCreateProjectsInManagerDialogue = () => {
    return {
        type: 'CLOSE_CREATE_PROJECTS_IN_MANAGER_DIALOGUE',
    }
}

export const getProjectsInManager = () => {
    return {
        type: 'GET_PROJECTS_IN_MANAGER',
    }
}

export const updateProjectInManager = ({title, description, isFavorited}) => {
    return {
        type: 'CREATE_PROJECT_IN_MANAGER',
        payload: {
            title,
            description,
            isFavorited
        }
    }
}

export const selectProjectInManager = ({projectId}) => {
    return {
        type: 'SELECT_PROJECT_IN_MANAGER',
        payload: {
            projectId
        }
    }
}

export const getProjectInManager = ({projectId}) => {
    return {
        type: 'GET_PROJECT_IN_MANAGER',
        meta: {
            projectId
        }
    }
}

export const createActionInProject = ({parentActionId=null, form={}}) => {
    return {
        type: 'CREATE_ACTION_IN_PROJECT',
        payload: {
            parentActionId,
            title: form.title,
        },
    }
}

export const getActionsInProject = () => {
    return {
        type: 'GET_ACTIONS_IN_PROJECT',
    }
}

export const deleteActionInProject = ({actionId}) => {
    return {
        type: 'DELETE_ACTION_IN_PROJECT',
        payload: {
            actionId
        }
    }
}


