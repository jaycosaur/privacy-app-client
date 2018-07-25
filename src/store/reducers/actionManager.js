const defaultState = {
    projects: {},
    projectsStatus: {
        isLoadingProjects: false,
        projectsLoadError: false,
        projectsLoadErrorMessage: null,
        lastLoadTime: null,
    },
    dialogs: {
        createProject: {
            isOpen: false
        }
    },
    selectedProject: {
        projectId: null,
        isLoaded: null,
        isLoadError: null,
        loadErrorMessage: null,
        project: null,
        children: null,
    }

}

export default(state = defaultState, action) => {
    switch(action.type) {
        case 'RESET_STATE_TO_DEFAULT':
            return {...defaultState}
        case 'SELECT_PROJECT_IN_MANAGER':
            return {...state, 
                selectedProject: {
                    ...state.selectedProject,
                    projectId: action.payload.projectId
                }
            }
        case 'GET_PROJECTS_IN_MANAGER_PENDING':
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: true, 
                    projectsLoadError: false, 
                    projectsLoadErrorMessage: null
                }
            }
        case 'GET_PROJECTS_IN_MANAGER_FULFILLED':
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: false, 
                    lastLoadTime: Date.now()
                },
                projects: {...state.projects, ...action.payload}
            }
        case 'GET_PROJECT_IN_MANAGER_FULFILLED':
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: false, 
                    lastLoadTime: Date.now()
                },
                projects: {...state.projects, ...action.payload}
            }
        case 'GET_ACTIONS_IN_PROJECT_PENDING':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isLoadingActions: true, 
                        ActionsLoadError: false, 
                        hasLoadedActions: false,
                        ActionsLoadErrorMessage: null
                    } 
                }
            }
        case 'GET_ACTIONS_IN_PROJECT_FULFILLED':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isLoadingActions: false, 
                        lastActionsLoadTime: Date.now(),
                        hasLoadedActions: true,
                        actions: {
                            ...action.payload
                        }
                    } 
                }
            }
        case 'GET_ACTION_IN_PROJECT_FULFILLED':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isLoadingActions: false, 
                        lastActionsLoadTime: Date.now(),
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            ...action.payload
                        }
                    } 
                }
            }
        case 'DELETE_ACTION_IN_PROJECT_FULFILLED':
            const { [action.meta.actionId]:{...rem}, ...remain} = state.projects[action.meta.projectId].actions
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...remain
                        }
                    } 
                }
            }
        case 'OPEN_CREATE_PROJECTS_IN_MANAGER_DIALOGUE':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    createProject: {
                        ...state.dialogs.createProject,
                        isOpen: true
                    }
                },
            }
        case 'CLOSE_CREATE_PROJECTS_IN_MANAGER_DIALOGUE':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    createProject: {
                        ...state.dialogs.createProject,
                        isOpen: false
                    }
                },
            }
        


            
        default: 
            return state
    }
}