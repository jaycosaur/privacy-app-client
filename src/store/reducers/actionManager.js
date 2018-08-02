const defaultState = {
    projects: {},
    projectsStatus: {
        isLoadingProjects: false,
        projectsLoadError: false,
        projectsLoadErrorMessage: null,
        lastLoadTime: null,
        currentAssignedActions: {},
        currentAssignedTasks: {},
        isFetchingCurrentAssignedTasksAndActions: false
    },
    dialogs: {
        createProject: {
            isOpen: false
        },
        updateProject: {
            isOpen: false
        }
    },
    selectedProject: {
        projectId: null,
        actionId: null,
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
        case "GET_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS_PENDING": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isFetchingCurrentAssignedTasksAndActions: true
                }
            }
        }
        case "GET_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS_FULFILLED": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    currentAssignedActions: action.payload.actions,
                    currentAssignedTasks: action.payload.tasks,
                    isFetchingCurrentAssignedTasksAndActions: false
                }
            }
        }
        // PROJECT SPECIFIC REDUCERS
        case "UPDATE_PROJECT_IN_STORE": {
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        ...action.payload
                    }

                }
            }
        }
        case "DELETE_PROJECT_IN_STORE": {
            const { [action.meta.projectId]:{...projCon}, ...remProjs} = state.projects
            return {...state, 
                projects: {
                    ...remProjs
                }
            }
        }
        // OTHER
        case "DELETE_PROJECT_IN_MANAGER_PENDING": {
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isDeleting: true
                    }

                }
            }
        }

        case 'SELECT_PROJECT_IN_MANAGER':
            return {...state, 
                selectedProject: {
                    ...state.selectedProject,
                    projectId: action.payload.projectId
                }
            }
        case 'SELECT_ACTION_IN_PROJECT':
            return {...state, 
                selectedProject: {
                    ...state.selectedProject,
                    actionId: action.payload.actionId
                }
            }
        case 'DESELECT_ACTION_IN_PROJECT':
            return {...state, 
                selectedProject: {
                    ...state.selectedProject,
                    actionId: null
                }
            }
        case 'SUBSCRIBE_TO_PROJECTS_IN_MANAGER_OPEN':
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: true, 
                    projectsLoadError: false, 
                    projectsLoadErrorMessage: null
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
                projects: {...state.projects, 
                    [Object.keys(action.payload)[0]]:{
                        ...state.projects[Object.keys(action.payload)[0]],
                        ...action.payload[Object.keys(action.payload)[0]]
                    }
                }
            }
        case 'SUBSCRIBE_TO_ACTIONS_IN_PROJECT_OPEN':
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
        case 'FETCHED_ACTIONS_IN_PROJECT_IN_STORE':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        hasLoadedActions: true,
                    } 
                }
            }

        case 'UPDATE_ACTION_IN_PROJECT_IN_STORE': {
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isLoadingActions: false, 
                        lastActionsLoadTime: Date.now(),
                        hasLoadedActions: true,
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.payload.actionId]: {
                                ...state.projects[action.meta.projectId].actions&&state.projects[action.meta.projectId].actions[action.payload.actionId],
                                ...action.payload
                            }
                        }
                    } 
                }
            }
        }

        case "DELETE_ACTION_IN_PROJECT_IN_STORE": {
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
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                ...action.payload
                            }
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
        case 'OPEN_UPDATE_PROJECTS_IN_MANAGER_DIALOGUE':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    updateProject: {
                        ...state.dialogs.updateProject,
                        isOpen: true
                    }
                },
            }
        case 'CLOSE_UPDATE_PROJECTS_IN_MANAGER_DIALOGUE':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    updateProject: {
                        ...state.dialogs.updateProject,
                        isOpen: false
                    }
                },
            }

        case "FETCHED_NOTES_IN_ACTION_IN_STORE":
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                hasFetchedNotes: true,
                                hasSubscribedNotes: true
                            }
                        }
                    }
                }
            }
        case "FETCHED_TASKS_IN_ACTION_IN_STORE":
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                hasFetchedTasks: true,
                                hasSubscribedTasks: true
                            }
                        }
                    }
                }
            }
        case "FETCHED_FILES_IN_ACTION_IN_STORE":
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                hasFetchedFiles: true,
                                hasSubscribedFiles: true
                            }
                        }
                    }
                }
            }
        case 'UPDATE_NOTE_IN_ACTION_IN_STORE':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                notes: {
                                    ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].notes,
                                    [action.meta.noteId]: {
                                        ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].notes&&state.projects[action.meta.projectId].actions[action.meta.actionId].notes[action.meta.noteId],
                                        ...action.payload
                                    }
                                }
                            }
                        }
                    } 
                }
            }
        case 'UPDATE_FILE_IN_ACTION_IN_STORE':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                files: {
                                    ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].files,
                                    [action.meta.fileId]: {
                                        ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].files&&state.projects[action.meta.projectId].actions[action.meta.actionId].files[action.meta.fileId],
                                        ...action.payload
                                    }
                                }
                            }
                        }
                    } 
                }
            }
        case 'UPDATE_TASK_IN_ACTION_IN_STORE':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                tasks: {
                                    ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].tasks,
                                    [action.meta.taskId]: {
                                        ...state.projects[action.meta.projectId].actions[action.meta.actionId]&&state.projects[action.meta.projectId].actions[action.meta.actionId].tasks&&state.projects[action.meta.projectId].actions[action.meta.actionId].tasks[action.meta.taskId],
                                        ...action.payload
                                    }
                                }
                            }
                        }
                    } 
                }
            }

        case 'DELETE_TASK_IN_ACTION_PENDING':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                tasks: {
                                    ...state.projects[action.meta.projectId].actions[action.meta.actionId].tasks,
                                    [action.meta.taskId]:{
                                        ...state.projects[action.meta.projectId].actions[action.meta.actionId].tasks[action.meta.taskId],
                                        isDeleting: true
                                    }
                                }
                            }
                        }
                    }
                }
            }

        case 'DELETE_TASK_IN_ACTION_IN_STORE':
            const { [action.meta.taskId]: {taskDel}, ...remTasks} = state.projects[action.meta.projectId].actions[action.meta.actionId].tasks
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                tasks: {
                                    ...remTasks
                                }
                            }
                        }
                    } 
                }
            }
        case 'DELETE_FILE_IN_ACTION_PENDING':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                files: {
                                    ...state.projects[action.meta.projectId].actions[action.meta.actionId].files,
                                    [action.meta.fileId]:{
                                        ...state.projects[action.meta.projectId].actions[action.meta.actionId].files[action.meta.fileId],
                                        isDeleting: true
                                    }
                                }
                            }
                        }
                    } 
                }
            }
        case 'DELETE_FILE_IN_ACTION_IN_STORE':
            const { [action.meta.fileId]: {fileDel}, ...remfiles} = state.projects[action.meta.projectId].actions[action.meta.actionId].files
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        actions: {
                            ...state.projects[action.meta.projectId].actions,
                            [action.meta.actionId]:{
                                ...state.projects[action.meta.projectId].actions[action.meta.actionId],
                                files: {
                                    ...remfiles
                                }
                            }
                        }
                    } 
                }
            }
        default: 
            return state
    }
}