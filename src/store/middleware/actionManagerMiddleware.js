import { db, storageRef } from './../../config/firebase'
import moment from 'moment'

// create
// list
// get
// delete

const baseItemRef = ({id}) => db.collection("base-items").doc(id)


export function getBaseItemInformation() {
    return ({ dispatch }) => next => action => {
        if (action.type === 'GET_BASE_ITEM_INFORMATION') {
            return dispatch({ 
                type: "GET_BASE_ITEM_INFORMATION", 
                payload:  baseItemRef({id: action.meta.id}).get().then(res=>res.data()),
                meta: action.meta})
        }
        return next(action)
    }
}

const projectsRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('projects')
const projectRef = ({ organisationId, projectId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId)

export function createProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_PROJECT_IN_MANAGER') {
            const state = getState()
            const { organisation: {organisationId} } = state
            console.log(organisationId)
            const watchObject = {
                created: moment().toISOString(),
                createdBy: state.user.user.uid,
                title: action.payload.title,
                description: action.payload.description
            }
            return dispatch({ 
                type: "CREATE_PROJECT_IN_MANAGER", 
                payload: projectsRef({organisationId}).add(watchObject)
            }).then(()=>dispatch({type: 'CLOSE_CREATE_PROJECTS_IN_MANAGER_DIALOGUE'}))
        }
        return next(action)
    }
}

export function updateProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'UPDATE_PROJECT_IN_MANAGER') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId } } } = state
            dispatch({ 
                type: "UPDATE_PROJECT_IN_MANAGER", 
                payload: projectRef({organisationId, projectId}).update({...action.payload}) 
            })
            return dispatch({type: 'CLOSE_UPDATE_PROJECTS_IN_MANAGER_DIALOGUE'})
        }
        return next(action)
    }
}

//const updateProjectAction = ({ payload, projectId }) => ({type: "UPDATE_PROJECT_IN_STORE", payload, meta: { projectId }})
const updateProjectAction = ({ payload }) => ({type: "UPDATE_PROJECT_IN_STORE", payload })
const deleteProjectAction = ({ projectId }) => ({type: "DELETE_PROJECT_IN_STORE", meta: { projectId }})

export function getProjectsInManagerSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_PROJECTS_IN_MANAGER') {
            let state = getState()
            const { organisation: { organisationId }, user: { user: { uid } } } = state
            const isSubscribed = state.actionManager.projectsStatus.isSubscribedToProjects
            if (!isSubscribed&&organisationId){
                dispatch({
                    type: "SUBSCRIBE_TO_PROJECTS_IN_MANAGER_OPEN",
                })
                projectsRef({organisationId}).onSnapshot(function(querySnapshot) {
                    state = getState()
                    let projects = {}
                    querySnapshot.docChanges().forEach((change) => {
                        const docData = change.doc.data()
                        const projectId = change.doc.id
                        const payload = {
                            projectId, 
                            ...docData, 
                            isFavorited: docData.userFavorited&&docData.userFavorited.includes(uid)
                        }
                        if (change.type === "removed"){
                            dispatch(deleteProjectAction({ projectId }))
                        } else {
                            projects = {
                                ...projects,
                                [projectId]: {
                                    ...state.actionManager.projects[projectId],
                                    ...payload
                                }
                            }
                        }
                    })
                    if (Object.keys(projects).length>0){
                        dispatch(updateProjectAction({ payload: projects }))
                    } else {
                        dispatch({type: "NO_PROJECTS_FOR_ORGANISATION"})
                    }
                })
            }
            
        }
        return next(action)
    }
}

/* export function getProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_PROJEasdfCT_IN_MANAGER') {
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
} */

export function deleteProjectInManagerMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_PROJECT_IN_MANAGER') {
            const state = getState()
            const { organisation: { organisationId }} = state
            const { projectId } = action.payload
            dispatch({type: 'CLOSE_UPDATE_PROJECTS_IN_MANAGER_DIALOGUE'})
            return dispatch({ 
                type: "DELETE_PROJECT_IN_MANAGER", 
                payload: projectRef({organisationId, projectId}).delete(),
                meta: { projectId }
            })
        }
        return next(action)
    }
}

// create
// list
// get
// delete
// update

const updateActionAction = ({ payload, projectId }) => ({type: "UPDATE_ACTION_IN_PROJECT_IN_STORE", payload, meta: { projectId }})
const deleteActionAction = ({ projectId, actionId  }) => ({type: "DELETE_ACTION_IN_PROJECT_IN_STORE", meta: { projectId, actionId }})
const hasFetchedActions = ({ projectId }) => ({type: "FETCHED_ACTIONS_IN_PROJECT_IN_STORE", meta: { projectId }})

const actionsRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('actions')
const actionsInProjectRef = ({ organisationId, projectId }) => db.collection("organisations").doc(organisationId).collection('actions').where("projectId","==",projectId)
const actionRef = ({ organisationId, actionId }) => db.collection("organisations").doc(organisationId).collection('actions').doc(actionId)
const actionsOwnedByUserRef = ({ organisationId, userId}) => db.collection("organisations").doc(organisationId).collection('actions').where("ownerId","==",userId)

export function getActionsInProjectSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_ACTIONS_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            dispatch({
                type: "SUBSCRIBE_TO_ACTIONS_IN_PROJECT_OPEN", meta: { projectId }
            })
            actionsInProjectRef({organisationId, projectId}).onSnapshot(function(querySnapshot) {
                let actions = {}
                querySnapshot.docChanges().forEach((change) => {
                    const docData = change.doc.data()
                    const actionId = change.doc.id
                    const projectId = docData.projectId
                    const payload = {
                        actionId, 
                        ...docData, 
                    }
                    if (change.type === "removed"){
                        dispatch(deleteActionAction({ projectId, actionId }))
                    } else {
                        actions = {
                            ...actions,
                            [actionId]: payload
                        }
                    }
                })
                dispatch(updateActionAction({ payload: actions, projectId }))
                dispatch(hasFetchedActions({ projectId }))
            })
        }
        return next(action)
    }
}

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
                created: moment().toISOString(),
                createdBy: state.user.user.uid, 
                subscribedUsers: [],
                isUrgent: false,
                countTasks: 0,
                countTasksCompleted: 0,
                organisationId,
                projectId
            }
            return dispatch({ 
                type: "CREATE_ACTION_IN_PROJECT", 
                payload: actionsRef({ organisationId }).add(actionObject),
                meta: {
                    projectId,
                    organisationId
                }
            })
        }
        return next(action)
    }
}

export function updateFocusedActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "UPDATE_ACTION_IN_PROJECT_FOCUSED") {
            const state = getState()
            const { organisation: { organisationId },  actionManager: { selectedProject: { projectId, actionId }}} = state
            const payload = action.payload
            Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key])
            return dispatch({ 
                type: "UPDATE_ACTION_IN_PROJECT", 
                payload: actionRef({organisationId, actionId}).update(payload),
                meta: {
                    organisationId,
                    projectId,
                    actionId,
                }
            })
        }
        return next(action)
    }
}

export function updateActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "UPDATE_ACTION_IN_PROJECT") {
            const state = getState()
            const { organisation: { organisationId },  actionManager: { selectedProject: { projectId }}} = state
            const { actionId } = action.meta
            return dispatch({ 
                type: "UPDATE_ACTION_IN_PROJECT", 
                payload: actionRef({organisationId, actionId}).update(action.payload),
                meta: {
                    organisationId,
                    projectId,
                    actionId,
                }
            })
        }
        return next(action)
    }
}

export function toggleUrgencyOfActionsMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "HANDLE_TOGGLE_ACTION_AS_URGENT") {
            const state = getState()
            const { organisation: { organisationId },  actionManager: { selectedProject: { projectId }}} = state
            const { actionId } = action.payload
            const currentUrgency = state.actionManager.projects[projectId].actions[actionId].isUrgent
            return dispatch({ 
                type: "UPDATE_ACTION_IN_PROJECT", 
                payload: { isUrgent: !currentUrgency },
                meta: {
                    organisationId,
                    projectId,
                    actionId,
                }
            })
        }
        return next(action)
    }
}

export function getActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ACTION_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const { actionId } = action.meta
            dispatch({
                type: "GET_ACTION_IN_PROJECT",
                payload: actionRef({organisationId, actionId}).get().then(res => ({
                    actionId: res.id,
                    ...res.data()
                })),
                meta: {
                    actionId,
                    organisationId,
                    projectId
                }
            })
        }
        return next(action)
    }
}

export function deleteActionInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_ACTION_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const { actionId } = action.payload
            dispatch({ 
                type: "DELETE_ACTION_IN_PROJECT", 
                payload: actionRef({ organisationId, actionId }).delete(), 
                meta: {
                    actionId,
                    projectId
                }})
        }
        return next(action)
    }
}

// needs to create actions for tasks / notes / files / meetings

// create
// list
// get
// delete

//const tasksRef = ({ organisationId, projectId, actionId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('tasks')
//const taskRef = ({ organisationId, projectId, actionId, itemId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('tasks').doc(itemId)
//const notesRef = ({ organisationId, projectId, actionId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('notes')
//const noteRef = ({ organisationId, projectId, actionId, itemId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('notes').doc(itemId)
//const filesRef = ({ organisationId, projectId, actionId}) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('files')
//const fileRef = ({ organisationId, projectId, actionId, itemId }) => db.collection("organisations").doc(organisationId).collection('projects').doc(projectId).collection('actions').doc(actionId).collection('files').doc(itemId)
//const uploadFileToActionRef = ({ organisationId, projectId, actionId }) => storageRef.child('action_manager_storage').child(organisationId).child(projectId).child(actionId)
const uploadFileToActionRef = ({ organisationId, projectId, actionId }) => storageRef.child('action_manager_storage').child(organisationId).child(projectId).child(actionId)
const uploadFileToProjectRef = ({ organisationId, projectId }) => storageRef.child('action_manager_storage').child(organisationId).child(projectId)

const tasksRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('tasks')
const taskRef = ({ organisationId, id }) => tasksRef({organisationId}).doc(id)
const tasksInActionRef = ({ organisationId, actionId }) => tasksRef({organisationId}).where("actionId","==",actionId)
const tasksUserAssignedRef = ({ organisationId, userId }) => tasksRef({organisationId}).where("assignedTo","==",userId)

const notesRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('notes')
const noteRef = ({ organisationId, id }) => notesRef({ organisationId }).doc(id)
const notesInActionRef = ({ organisationId, actionId }) => notesRef({ organisationId }).where("actionId","==",actionId)

const filesRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('files')
const fileRef = ({ organisationId, id }) => filesRef({ organisationId }).doc(id)
// const filesInActionRef = ({ organisationId, actionId}) => filesRef({ organisationId }).where("actionId","==",actionId)
const filesInProjectRef = ({ organisationId, projectId}) => filesRef({ organisationId }).where("projectId","==",projectId)

const breachesRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('breaches')
// const breachRef = ({ organisationId, id }) => breachesRef({ organisationId }).doc(id)
// actionsOwnedByUserRef
// tasksUserAssignedRef

const transformResponseToNestedObject = (res) => {
    let items = {}
    res.forEach(doc => {
        const docData = doc.data()
        const id = doc.id
        items = {
            ...items,
            [id]: { 
                id, 
                ...docData,
            }
        }
    })
    return items
}

const updateUserAssignedAction = ({ payload }) => ({type: "UPDATE_CURRENT_USER_ASSIGNED_ACTION_IN_STORE", payload })
const deleteUserAssignedAction = ({ actionId  }) => ({type: "DELETE_CURRENT_USER_ASSIGNED_ACTION_IN_STORE", meta: { actionId }})

export function getCurrentUserAssignedTasksAndActions() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS') {
            const { organisation: { organisationId }, user: { user: { uid } }} = getState()
            if(organisationId){
                dispatch({
                    type: "SUBSCRIBE_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS_OPEN"
                })
                actionsOwnedByUserRef({organisationId, userId: uid}).onSnapshot(function(querySnapshot) {
                    let actions = {}
                    querySnapshot.docChanges().forEach((change) => {
                        const docData = change.doc.data()
                        const actionId = change.doc.id
                        const payload = {
                            actionId, 
                            ...docData, 
                        }
                        if (change.type === "removed"){
                            dispatch(deleteUserAssignedAction({ actionId }))
                        } else {
                            actions = {
                                ...actions,
                                [actionId]: payload
                            }
                        }
                    })
                    if (Object.keys(actions).length>0){
                        dispatch(updateUserAssignedAction({ payload: actions }))
                    } else {
                        dispatch({type: "NO_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS"})
                    }
                })
            }
        }
        return next(action)
    }
}



export function createTaskInActionMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "CREATE_TASK_IN_ACTION") {
            const { organisation: { organisationId }, user: { user: { uid } },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
            const dbObject = {
                description: null,
                isDone: false,
                createdOn: moment().toISOString(),
                createdBy: uid,
                assignedTo: null,
                organisationId,
                projectId,
                actionId
            }
            return dispatch({ 
                type: "CREATE_TASK_IN_ACTION", 
                payload: tasksRef({ organisationId }).add(dbObject)
            })
        }
        return next(action)
    }
}

export function updateTaskInActionMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "UPDATE_TASK_IN_ACTION") {
            const { organisation: { organisationId }} = getState()
            const { taskId } = action.meta
            return dispatch({ 
                type: "UPDATE_TASK_IN_ACTION", 
                payload: taskRef({ organisationId, id: taskId }).update(action.payload)
            })
        }
        return next(action)
    }
}

export function createNoteInActionMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "CREATE_NOTE_IN_ACTION") {
            const {  user: { user: { uid } },organisation: { organisationId },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
            const dbObject = {
                organisationId,
                projectId,
                actionId,
                createdOn: moment().toISOString(),
                createdBy: uid,
                body: action.payload.body

            }
            return dispatch({ 
                type: "CREATE_NOTE_IN_ACTION", 
                payload: notesRef({ organisationId }).add(dbObject),
                meta: {
                    projectId,
                    actionId
                }
            })
        }
        return next(action)
    }
}

export function getTaskInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_TASK_IN_ACTION') {
            const { organisation: { organisationId },actionManager: { selectedProject: { projectId}}} = getState()
            const actionId = action.meta
            const taskId = null
            let items = {}
            dispatch({
                type: "GET_TASK_IN_ACTION", 
                payload: taskRef({organisationId, id:taskId}).get().then(res => {
                    const docData = res.data()
                    const id = res.id
                    items = {
                        ...items,
                        [id]: { 
                            id, 
                            ...docData,
                        }
                    }
                    return items
                }),
                meta: {
                    organisationId,
                    projectId,
                    actionId,
                }
            })
        }
        return next(action)
    }
}

const updateTaskAction = ({ payload, projectId, actionId, taskId }) => ({type: "UPDATE_TASK_IN_ACTION_IN_STORE", payload, meta: { projectId, actionId, taskId }})
const deleteTaskAction = ({ projectId, actionId, taskId  }) => ({type: "DELETE_TASK_IN_ACTION_IN_STORE", meta: { projectId, actionId, taskId }})
const hasFetchedTasksAction = ({ payload, projectId, actionId }) => ({type: "FETCHED_TASKS_IN_ACTION_IN_STORE", meta: { projectId, actionId }})

export function getTasksInActionSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_TASKS_IN_ACTION') {
            let state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const actionId = action.payload.actionId
            dispatch({
                type: "SUBSCRIBE_TO_TASKS_IN_ACTION_OPEN", meta: { projectId,  }
            })
            tasksInActionRef({organisationId, actionId}).onSnapshot(function(querySnapshot) {
                state = getState()
                dispatch(hasFetchedTasksAction({ projectId, actionId, }))
                querySnapshot.docChanges().forEach((change) => {
                    const docData = change.doc.data()
                    const id = change.doc.id
                    const projectId = docData.projectId
                    const payload = {
                        id, 
                        ...docData, 
                    }
                    if (change.type === "removed"){
                        console.log(state.actionManager.projects[projectId].actions[actionId])
                        state.actionManager.projects[projectId].actions[actionId].tasks[id]
                            &&dispatch(deleteTaskAction({ projectId, actionId, taskId: id}))
                    } else {
                        dispatch(updateTaskAction({ payload, projectId, actionId, taskId: id}))
                    }
                })
            })
        }
        return next(action)
    }
}

const updateNoteAction = ({ payload, projectId, actionId, noteId }) => ({type: "UPDATE_NOTE_IN_ACTION_IN_STORE", payload, meta: { projectId, actionId, noteId }})
const deleteNoteAction = ({ projectId, actionId, noteId  }) => ({type: "DELETE_NOTE_IN_ACTION_IN_STORE", meta: { projectId, actionId, noteId }})
const hasFetchedNotesAction = ({ projectId, actionId }) => ({type: "FETCHED_NOTES_IN_ACTION_IN_STORE", meta: { projectId, actionId }})

export function getNotesInActionSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_NOTES_IN_ACTION') {
            let state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const actionId = action.payload.actionId
            dispatch({
                type: "SUBSCRIBE_TO_NOTES_IN_ACTION_OPEN", meta: { projectId,  }
            })
            notesInActionRef({organisationId, actionId}).onSnapshot(function(querySnapshot) {
                state = getState()
                dispatch(hasFetchedNotesAction({ projectId, actionId, }))
                querySnapshot.docChanges().forEach((change) => {
                    const docData = change.doc.data()
                    const id = change.doc.id
                    const projectId = docData.projectId
                    const payload = {
                        id, 
                        ...docData, 
                    }
                    if (change.type === "removed"){
                        state.actionManager.projects[projectId].actions[actionId].notes[id]
                            &&dispatch(deleteNoteAction({ projectId, actionId, noteId: id}))
                    } else {
                        dispatch(updateNoteAction({ payload, projectId, actionId, noteId: id}))
                    }
                })
            })
        }
        return next(action)
    }
}

// const updatefileAction = ({ payload, projectId, actionId, fileId }) => ({type: "UPDATE_FILE_IN_ACTION_IN_STORE", payload, meta: { projectId, actionId, fileId }})
const updatefileProject = ({ payload, projectId }) => ({type: "UPDATE_FILE_IN_PROJECT_IN_STORE", payload, meta: { projectId }})
const deletefileProject = ({ projectId, fileId }) => ({type: "DELETE_FILE_IN_PROJECT_IN_STORE", meta: { projectId, fileId }})
// const hasFetchedFilesAction = ({ projectId, actionId }) => ({type: "FETCHED_FILES_IN_ACTION_IN_STORE", meta: { projectId, actionId }})
const hasFetchedFilesProject = ({ projectId }) => ({type: "FETCHED_FILES_IN_PROJECT_IN_STORE", meta: { projectId }})

export function onSelectActionGetChildren() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SELECT_ACTION_IN_PROJECT') {
            const actionId = action.payload.actionId
            const projectId = getState().actionManager.selectedProject.projectId
            dispatch({
                type: "SUBSCRIBE_TO_TASKS_IN_ACTION", 
                payload: { actionId, projectId }
            })
            dispatch({
                type: "SUBSCRIBE_TO_NOTES_IN_ACTION", 
                payload: { actionId, projectId }
            })
            dispatch({
                type: "SUBSCRIBE_TO_FILES_IN_ACTION", 
                payload: { actionId, projectId }
            })
        }
        return next(action)
    }
}

export function deleteTaskInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_TASK_IN_ACTION') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId, actionId }}} = state
            const { taskId } = action.meta
            dispatch({ 
                type: "DELETE_TASK_IN_ACTION", 
                payload: taskRef({ organisationId, id:taskId }).delete(), 
                meta: {
                    actionId,
                    projectId,
                    taskId
                }})
        }
        return next(action)
    }
}

export function deleteNoteInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_NOTE_IN_ACTION') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId, actionId }}} = state
            const { noteId } = action.meta
            dispatch({ 
                type: "DELETE_NOTE_IN_ACTION", 
                payload: noteRef({ organisationId, id:noteId }).delete(), 
                meta: {
                    actionId,
                    projectId,
                    noteId
                }})
        }
        return next(action)
    }
}

export function deleteFileInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_FILE_IN_PROJECT') {
            const state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const { fileId } = action.meta
            dispatch({ 
                type: "DELETE_FILE_IN_PROJECT", 
                payload: fileRef({ organisationId, id: fileId }).delete(), 
                meta: {
                    projectId,
                    fileId
                }})
        }
        return next(action)
    }
}

// other returns

export function getTeamSnapshotStatistics() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_TEAM_SNAPSHOT_STATISTICS') {
            const state = getState()
            const { organisation: { organisationId }} = state
            
            const promArr = [
            projectsRef({ organisationId }).get().then(snap => ({ projectsCount: snap.size })),
            actionsRef({ organisationId }).get().then(snap => ({ actionsCount: snap.size })),
            tasksRef({ organisationId }).get().then(snap => ({ tasksCount: snap.size }))]

            dispatch({ 
                type: "GET_TEAM_SNAPSHOT_STATISTICS", 
                payload: Promise.all(promArr).then(res=>res.reduce((n,i)=>({...n,...i}),{})),
                meta: {
                    organisationId
                }})
        }
        return next(action)
    }
}



export function reportBreachInActionMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "REPORT_BREACH_IN_ACTION") {
            const {  user: { user: { uid } },organisation: { organisationId },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
            const dbObject = {
                organisationId,
                projectId,
                actionId,
                createdOn: moment().toISOString(),
                createdBy: uid,
                message: action.payload.message,
            }
            return dispatch({ 
                type: "REPORT_BREACH_IN_ACTION", 
                payload: breachesRef({ organisationId }).add(dbObject),
                meta: {
                    projectId,
                    actionId
                }
            })
        }
        return next(action)
    }
}

// STORAGE

export function createFileInProjectMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "CREATE_FILE_IN_PROJECT") {
            const { organisation: { organisationId }, user: { user: { uid } },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
            const files = action.payload
            const fileStorageRef = uploadFileToProjectRef({ organisationId, projectId })
            files.map((file)=>dispatch({
                type:"UPLOAD_FILE_TO_PROJECT",
                payload: fileStorageRef.child(file.name).put(file).then(async function() {
                    const url = await fileStorageRef.child(file.name).getDownloadURL()
                    return dispatch(
                        {
                            type: "CREATE_FILE_IN_PROJECT",
                            payload: filesRef({ organisationId }).add({
                                name: fileStorageRef.child(file.name).name,
                                path: fileStorageRef.child(file.name).fullPath,
                                downloadUrl: url,
                                createdOn: moment().toISOString(),
                                createdBy: uid,
                                fileByteSize: file.size,
                                organisationId,
                                projectId,
                            }),
                            meta: {
                                projectId,
                                organisationId,
                                name: file.name
                            }
                        })
                    }),
                meta: {
                    projectId,
                    actionId,
                    organisationId,
                    name: file.name
                }
            }))
        }
        return next(action)
    }   
}

export function createFileInActionMW() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === "CREATE_FILE_IN_ACTION") {
            const { organisation: { organisationId }, user: { user: { uid } },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
            const files = action.payload
            const fileStorageRef = uploadFileToActionRef({ organisationId, projectId, actionId })
            files.map((file)=>dispatch({
                type:"UPLOAD_FILE_TO_ACTION",
                payload: fileStorageRef.child(file.name).put(file).then(async function() {
                    const url = await fileStorageRef.child(file.name).getDownloadURL()
                    return dispatch(
                        {
                            type: "CREATE_FILE_IN_ACTION",
                            payload: filesRef({ organisationId }).add({
                                name: fileStorageRef.child(file.name).name,
                                path: fileStorageRef.child(file.name).fullPath,
                                downloadUrl: url,
                                createdOn: moment().toISOString(),
                                createdBy: uid,
                                fileByteSize: file.size,
                                organisationId,
                                projectId,
                                actionId
                            }),
                            meta: {
                                projectId,
                                actionId,
                                organisationId,
                                name: file.name
                            }
                        })
                    }),
                meta: {
                    projectId,
                    actionId,
                    organisationId,
                    name: file.name
                }
            }))
        }
        return next(action)
    }   
}

export function getfilesInProjectSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_STORAGE_IN_PROJECT' || action.type === "SUBSCRIBE_TO_FILES_IN_ACTION") {
            let state = getState()
            const { organisation: { organisationId } } = state
            const projectId = action.payload.projectId
            const isSubscribed = state.actionManager.projects[projectId].isSubscribedToStorage
            if (!isSubscribed){
                dispatch({
                    type: "SUBSCRIBE_TO_STORAGE_IN_PROJECT_OPEN", meta: { projectId }
                })
                filesInProjectRef({organisationId, projectId}).onSnapshot((querySnapshot) => {
                    dispatch(hasFetchedFilesProject({ projectId }))
                    state = getState()
                    let updateItems = {}
                    querySnapshot.docChanges().forEach((change) => {
                        const docData = change.doc.data()
                        const id = change.doc.id
                        const projectId = docData.projectId
                        const payload = {
                            id, 
                            ...docData, 
                        }
                        if (change.type === "removed"){
                            state.actionManager.projects[projectId].storage&&state.actionManager.projects[projectId].storage[id]
                                &&dispatch(deletefileProject({ projectId, fileId: id}))
                        } else {
                            updateItems = {
                                ...updateItems,
                                [id]: payload
                            }
                        }
                    })
                    if (updateItems){
                        dispatch(updatefileProject({ payload:updateItems, projectId }))
                    }
                })
            }
        }
        return next(action)
    }
}

export function onOpenFileExplorerGetFiles() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'OPEN_FILE_EXPLORER_IN_PROJECT_VIEW') {
            let state = getState()
            const { actionManager: { selectedProject: { projectId }}} = state
            const isSubscribed = state.actionManager.projects[projectId].isSubscribedToStorage
            if(!isSubscribed){
                dispatch({
                    type: "SUBSCRIBE_TO_STORAGE_IN_PROJECT", 
                    payload: { projectId }
                })
            }
        }
        return next(action)
    }
}

export function onStorageGetFiles() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'ON_STORAGE_GET_FILES') {
            let state = getState()
            const { actionManager: { selectedProject: { projectId }}} = state
            const isSubscribed = state.actionManager.projects[projectId].isSubscribedToStorage
            if(!isSubscribed){
                dispatch({
                    type: "SUBSCRIBE_TO_STORAGE_IN_PROJECT", 
                    payload: { projectId }
                })
            }
        }
        return next(action)
    }
}