import { db } from './../../config/firebase'

// create
// list
// get
// delete

const projectsRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('projects')
const projectRef = ({ organisationId, projectId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId)

export function createProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_PROJECT_IN_MANAGER') {
            const state = getState()
            const { organisation: {organisationId} } = state
            console.log(organisationId)
            const watchObject = {
                created: Date.now(),
                createdBy: state.user.user.uid,
                title: action.payload.title,
                description: action.payload.description
            }
            return dispatch({ 
                type: "CREATE_PROJECT_IN_MANAGER", 
                payload: projectsRef({organisationId}).add(watchObject) 
            })
        }
        return next(action)
    }
}


export function getProjectInManagerOnProjectCreateFulfilledMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_PROJECT_IN_MANAGER_FULFILLED') {
            const state = getState()
            const { user: { user: { uid } } } = state
            dispatch({
                type: "GET_PROJECT_IN_MANAGER",
                payload:action.payload.get().then(res => ({
                        [res.id]: { 
                            projectId: res.id, 
                            ...res.data(), 
                            isFavorited: res.data().userFavorited&&res.data().userFavorited.includes(uid)
                        }
                    })),
                meta: action.meta
            })
        }
        return next(action)
    }
}

export function getProjectsInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_PROJECTS_IN_MANAGER') {
            const state = getState()
            const { organisation: { organisationId }, user: { user: { uid } } } = state
            let projects = {}
            dispatch({
                type: "GET_PROJECTS_IN_MANAGER", 
                payload: projectsRef({organisationId}).get().then(res => {
                    res.forEach(doc => {
                        const docData = doc.data()
                        const projectId = doc.id
                        projects = {
                            ...projects,
                            [projectId]: { 
                                projectId, 
                                ...docData, 
                                isFavorited: docData.userFavorited&&docData.userFavorited.includes(uid)
                            }
                        }
                    })
                    return projects
                })
            })
        }
        return next(action)
    }
}

export function getProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_PROJECT_IN_MANAGER') {
            const state = getState()
            const { organisation: { organisationId }, user: { user: { uid } } } = state
            const projectId = action.meta.projectId
            dispatch({
                type: "GET_PROJECT_IN_MANAGER",
                payload: projectRef({ organisationId, projectId }).get().then(res => ({
                    [res.id]: { 
                        projectId: res.id, 
                        ...res.data(), 
                        isFavorited: res.data().userFavorited&&res.data().userFavorited.includes(uid)
                    }
                })),
                meta: action.meta
            })
        }
        return next(action)
    }
}

export function deleteProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_PROJECT_IN_MANAGER') {
            const state = getState()
            const watchlistItemRef = db.collection("watchlists").doc(state.user.user.uid).collection('watchlists').doc(action.meta)
            dispatch({ type: "DELETE_WATCHLIST_ITEM", payload: watchlistItemRef.delete(), meta: action.meta })
        }
        return next(action)
    }
}

// create
// list
// get
// delete

const actionsRef = ({ organisationId, projectId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions')
const actionRef = ({ organisationId, projectId, actionId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId)

export function createActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "CREATE_ACTION_IN_PROJECT") {
            const state = getState()
            const { organisation: { organisationId },  actionManager: { selectedProject: { projectId }}} = state
            const { parentActionId, title } = action.payload
            const actionObject = {
                parentActionId: parentActionId,
                title: title,
                dueDate: null,
                ownerId: null,
                created: Date.now(),
                createdBy: state.user.user.uid, 
                subscribedUsers: [],
                isUrgent: false,
                countTasks: 0,
                countTasksCompleted: 0,
            }
            return dispatch({ 
                type: "CREATE_ACTION_IN_PROJECT", 
                payload: actionsRef({organisationId, projectId}).add(actionObject),
                meta: {
                    projectId,
                }
            })
        }
        return next(action)
    }
}

export function getActionsInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ACTIONS_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, user: { user: { uid } }, actionManager: { selectedProject: { projectId }}} = state
            let projectActions = {}
            dispatch({
                type: "GET_ACTIONS_IN_PROJECT", 
                payload: actionsRef({organisationId, projectId}).get().then(res => {
                    res.forEach(doc => {
                        const docData = doc.data()
                        const actionId = doc.id
                        projectActions = {
                            ...projectActions,
                            [actionId]: { 
                                actionId, 
                                ...docData,
                            }
                        }
                    })
                    return projectActions
                }),
                meta: {
                    projectId: projectId
                }
            })
        }
        return next(action)
    }
}

export function getActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_PROJECT_IN_MANAGERasdfasdf') {
            const state = getState()
            const watchlistRef = db.collection("watchlists").doc(state.user.user.uid).collection('watchlists').doc(action.meta)
            dispatch({
                type: "FETCH_WATCHLIST_ITEM",
                payload: watchlistRef.get().then(res => res.data()),
                meta: action.meta
            })
        }
        return next(action)
    }
}

export function deleteActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_ACTION_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, user: { user: { uid } }, actionManager: { selectedProject: { projectId }}} = state
            const { actionId } = action.payload
            dispatch({ 
                type: "DELETE_ACTION_IN_PROJECT", 
                payload: actionRef({ organisationId, projectId, actionId }).delete(), 
                meta: {
                    actionId,
                    projectId
                }})
        }
        return next(action)
    }
}

export function getActionInProjectOnActionCreateFulfilledMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_ACTION_IN_PROJECT_FULFILLED') {
            const state = getState()
            dispatch({
                type: "GET_ACTION_IN_PROJECT",
                payload:action.payload.get().then(res => ({
                    [res.id]: { 
                        actionId: res.id, 
                        ...res.data(),
                    }
                })),
                meta: action.meta
            })
        }
        return next(action)
    }
}


