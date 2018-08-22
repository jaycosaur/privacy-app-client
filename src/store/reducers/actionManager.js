const defaultState = {
    projects: {},
    events: {},
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
        },
        projectStorage: {
            isOpen: false
        }
    },
    baseItems: {

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
        case 'GET_BASE_ITEM_INFORMATION_PENDING':
            return {
                ...state,
                baseItems: {
                    ...state.baseItems,
                    [action.meta.id]: {
                        isLoading: true
                    }
                }
            }
        case 'GET_BASE_ITEM_INFORMATION_FULFILLED':
            return {
                ...state,
                baseItems: {
                    ...state.baseItems,
                    [action.meta.id]: {
                        isLoading: false,
                        ...action.payload
                    }
                }
            }
        case "GROUP_OBLIGATIONS_IN_PROJECT_VIEW":
            return {
                ...state,
                selectedProject: {
                    ...state.selectedProject,
                    groupObligations: action.payload
                }
            }
        case "UNGROUP_OBLIGATIONS_IN_PROJECT_VIEW":
            return {
                ...state,
                selectedProject: {
                    ...state.selectedProject,
                    groupObligations: null
                }
            }
        case "SUBSCRIBE_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS_OPEN": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isSubscribedCurrentAssignedTasksAndActions: true,
                    isLoadingCurrentAssignedTasksAndActions: true,
                }
            }
        }
        case "NO_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingCurrentAssignedTasksAndActions: false,
                }
            }
        }
        // USER_ASSIGNED_TASKS_AND_ACTIONS
        case "UPDATE_CURRENT_USER_ASSIGNED_ACTION_IN_STORE": {
            return {...state,
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingCurrentAssignedTasksAndActions: false,
                    currentAssignedActions: {
                        ...state.projectsStatus.currentAssignedActions,
                        ...action.payload
                    }
                }
            }
        }
        case "DELETE_CURRENT_USER_ASSIGNED_ACTION_IN_STORE": {
            const { [action.meta.actionId]: acCon, ...remAction} = state.projects
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    currentAssignedActions: {
                        ...remAction
                    }
                }
            }
        }
        // PROJECT SPECIFIC REDUCERS
        case "UPDATE_PROJECT_IN_STORE": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: false,
                },
                projects: {
                    ...state.projects,
                    ...action.payload
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
        // LATEST EVENTS SPECIFIC REDUCERS
        case "UPDATE_UPDATE_LATEST_EVENT_IN_STORE": {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingLatestEvents: false,
                },
                events: {
                    ...state.events,
                    ...action.payload
                }
            }
        }
        case "DELETE_UPDATE_LATEST_EVENT_IN_STORE": {
            const { [action.meta.eventId]:{...leCon}, ...remEv} = state.events
            return {...state, 
                events: {
                    ...remEv
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
                    isSubscribedToProjects: true,
                    projectsLoadError: false, 
                    projectsLoadErrorMessage: null
                }
            }
        case "NO_PROJECTS_FOR_ORGANISATION":
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingProjects: false, 
                    isSubscribedToProjects: true,
                    projectsLoadError: false, 
                    projectsLoadErrorMessage: null
                }
            }
        case 'SUBSCRIBE_TO_COMPLIANCE_MANAGER_LATEST_EVENTS_OPEN':
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingLatestEvents: true, 
                    isSubscribedToLatestEvents: true,
                    latestEventsLoadError: false, 
                    latestEventsLoadErrorMessage: null
                }
            }
        case "NO_COMPLIANCE_MANAGER_LATEST_EVENTS":
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isLoadingLatestEvents: false, 
                    isSubscribedToLatestEvents: true,
                    latestEventsLoadError: false, 
                    latestEventsLoadErrorMessage: null
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
                            ...action.payload
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
        case 'OPEN_FILE_EXPLORER_IN_PROJECT_VIEW':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    projectStorage: {
                        ...state.dialogs.projectStorage,
                        isOpen: true
                    }
                },
            } 
        case 'CLOSE_FILE_EXPLORER_IN_PROJECT_VIEW':
            return {...state, 
                dialogs: {
                    ...state.dialogs,
                    projectStorage: {
                        ...state.dialogs.projectStorage,
                        isOpen: false
                    }
                },
            }
        case 'SUBSCRIBE_TO_STORAGE_IN_PROJECT_OPEN':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isSyncingStorage: true, 
                        storageSyncError: false, 
                        hasSyncedStorage: false,
                        storageSyncErrorMessage: null,
                        isSubscribedToStorage: true
                    } 
                }
            }
        case 'FETCHED_STORAGE_IN_PROJECT_IN_STORE':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        hasSyncedStorage: true,
                    } 
                }
            }
        case 'UPDATE_FILE_IN_PROJECT_IN_STORE': {
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        isSyncingStorage: false, 
                        lastStorageSyncTime: Date.now(),
                        hasSyncedStorage: true,
                        storage: {
                            ...state.projects[action.meta.projectId].storage,
                            ...action.payload
                        }
                    } 
                }
            }
        }
        case 'UPLOAD_FILE_TO_PROJECT_PENDING': {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isUploadingToStorage: true
                } 
            }
        }
        case 'CREATE_FILE_IN_PROJECT_PENDING': {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isUploadingToStorage: true
                } 
            }
        }
        case 'CREATE_FILE_IN_PROJECT_FULFILLED': {
            return {...state, 
                projectsStatus: {
                    ...state.projectsStatus,
                    isUploadingToStorage: false
                } 
            }
        }
        
        case 'DELETE_FILE_IN_PROJECT_PENDING':
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        storage: {
                            ...state.projects[action.meta.projectId].storage,
                            [action.meta.fileId]:{
                                ...state.projects[action.meta.projectId].storage[action.meta.fileId],
                                isDeleting: true
                            }
                        }
                    } 
                }
            }
        case 'DELETE_FILE_IN_PROJECT_IN_STORE':
            const { [action.meta.fileId]: {file2Del}, ...remFiles} = state.projects[action.meta.projectId].storage
            return {...state, 
                projects: {
                    ...state.projects,
                    [action.meta.projectId]: {
                        ...state.projects[action.meta.projectId],
                        storage: {
                            ...remFiles
                        }
                    } 
                }
            }
        default: 
            return state
    }
}