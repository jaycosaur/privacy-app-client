import { db, storageRef } from './../../config/firebase'
import moment from 'moment'

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
            return dispatch({ 
                type: "UPDATE_PROJECT_IN_MANAGER", 
                payload: projectRef({organisationId, projectId}).update({...action.payload}).then(async ()=>{
                    await dispatch({type: 'CLOSE_UPDATE_PROJECTS_IN_MANAGER_DIALOGUE'})
                }) 
            })
        }
        return next(action)
    }
}

const updateProjectAction = ({ payload, projectId }) => ({type: "UPDATE_PROJECT_IN_STORE", payload, meta: { projectId }})
const deleteProjectAction = ({ projectId }) => ({type: "DELETE_PROJECT_IN_STORE", meta: { projectId }})

export function getProjectsInManagerSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_PROJECTS_IN_MANAGER') {
            const state = getState()
            const { organisation: { organisationId }, user: { user: { uid } } } = state
            dispatch({
                type: "SUBSCRIBE_TO_PROJECTS_IN_MANAGER_OPEN",
            })
            projectsRef({organisationId}).onSnapshot(function(querySnapshot) {
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
                        dispatch(updateProjectAction({ payload, projectId }))
                    }
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

const updateActionAction = ({ payload, projectId, actionId }) => ({type: "UPDATE_ACTION_IN_PROJECT_IN_STORE", payload, meta: { projectId, actionId }})
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
                dispatch(hasFetchedActions({ projectId }))
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
                        dispatch(updateActionAction({ payload, projectId, actionId }))
                    }
                })
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
            }).then(()=>dispatch({
                type: "GET_ACTION_IN_PROJECT", 
                meta: {
                    organisationId,
                    projectId,
                    actionId,
                }
            }))
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
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId }}} = state
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
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId }}} = state
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

const tasksRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('tasks')
const taskRef = ({ organisationId, id }) => tasksRef({organisationId}).doc(id)
const tasksInActionRef = ({ organisationId, actionId }) => tasksRef({organisationId}).where("actionId","==",actionId)
const tasksUserAssignedRef = ({ organisationId, userId }) => tasksRef({organisationId}).where("assignedTo","==",userId)

const notesRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('notes')
const noteRef = ({ organisationId, id }) => notesRef({ organisationId }).doc(id)
const notesInActionRef = ({ organisationId, actionId }) => notesRef({ organisationId }).where("actionId","==",actionId)

const filesRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('files')
const fileRef = ({ organisationId, id }) => filesRef({ organisationId }).doc(id)
const filesInActionRef = ({ organisationId, actionId}) => filesRef({ organisationId }).where("actionId","==",actionId)

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
export function getCurrentUserAssignedTasksAndActions() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS') {
            const { organisation: { organisationId }, user: { user: { uid } }, actionManager: {}} = getState()
            dispatch({
                type: "GET_CURRENT_USER_ASSIGNED_TASKS_AND_ACTIONS", 
                payload: Promise.all(
                    [
                        actionsOwnedByUserRef({organisationId, userId: uid}).get().then(res=>transformResponseToNestedObject(res)),
                        tasksUserAssignedRef({organisationId, userId: uid}).get().then(res=>transformResponseToNestedObject(res))
                    ]
                ).then(res=>({actions: res[0], tasks: res[1]})),
                meta: {
                    userId: uid,
                    organisationId,
                }
            })
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
            const { organisation: { organisationId }, user: { },  actionManager: { selectedProject: { projectId, actionId }}} = getState()
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
                            }).then(res=>{
                                dispatch({
                                    type: "GET_FILE_IN_ACTION",
                                    payload: fileRef({organisationId, id: res.id}).get().then(snap=>{
                                        return {
                                            id: snap.id,
                                            ...snap.data()
                                        }
                                    }),
                                    meta: {
                                        projectId,
                                        actionId,
                                        organisationId,
                                        fileId: res.id
                                    }
                                    })
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


export function getTaskInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_TASK_IN_ACTION') {
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId}}} = getState()
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

const updatefileAction = ({ payload, projectId, actionId, fileId }) => ({type: "UPDATE_FILE_IN_ACTION_IN_STORE", payload, meta: { projectId, actionId, fileId }})
const deletefileAction = ({ projectId, actionId, fileId  }) => ({type: "DELETE_FILE_IN_ACTION_IN_STORE", meta: { projectId, actionId, fileId }})
const hasFetchedFilesAction = ({ projectId, actionId }) => ({type: "FETCHED_FILES_IN_ACTION_IN_STORE", meta: { projectId, actionId }})

export function getfilesInActionSubscription() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SUBSCRIBE_TO_FILES_IN_ACTION') {
            let state = getState()
            const { organisation: { organisationId }, actionManager: { selectedProject: { projectId }}} = state
            const actionId = action.payload.actionId
            dispatch({
                type: "SUBSCRIBE_TO_FILES_IN_ACTION_OPEN", meta: { projectId,  }
            })
            filesInActionRef({organisationId, actionId}).onSnapshot(function(querySnapshot) {
                dispatch(hasFetchedFilesAction({ projectId, actionId, }))
                state = getState()
                querySnapshot.docChanges().forEach((change) => {
                    const docData = change.doc.data()
                    const id = change.doc.id
                    const projectId = docData.projectId
                    const payload = {
                        id, 
                        ...docData, 
                    }
                    if (change.type === "removed"){
                        state.actionManager.projects[projectId].actions[actionId].files[id]
                            &&dispatch(deletefileAction({ projectId, actionId, fileId: id}))
                    } else {
                        dispatch(updatefileAction({ payload, projectId, actionId, fileId: id}))
                    }
                })
            })
        }
        return next(action)
    }
}

export function onSelectActionGetChildren() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SELECT_ACTION_IN_PROJECT') {
            const actionId = action.payload.actionId
            dispatch({
                type: "SUBSCRIBE_TO_TASKS_IN_ACTION", 
                payload: { actionId }
            })
            dispatch({
                type: "SUBSCRIBE_TO_NOTES_IN_ACTION", 
                payload: { actionId }
            })
            dispatch({
                type: "SUBSCRIBE_TO_FILES_IN_ACTION", 
                payload: { actionId }
            })
        }
        return next(action)
    }
}

export function deleteTaskInAction() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_TASK_IN_ACTION') {
            const state = getState()
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId, actionId }}} = state
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
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId, actionId }}} = state
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
        if (action.type === 'DELETE_FILE_IN_ACTION') {
            const state = getState()
            const { organisation: { organisationId }, user: { }, actionManager: { selectedProject: { projectId, actionId }}} = state
            const { fileId } = action.meta
            dispatch({ 
                type: "DELETE_FILE_IN_ACTION", 
                payload: fileRef({ organisationId, id:fileId }).delete(), 
                meta: {
                    actionId,
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
            const { organisation: { organisationId }, user: { }, actionManager: {}} = state
            
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