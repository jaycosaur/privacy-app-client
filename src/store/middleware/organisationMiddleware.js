import { db, functions } from './../../config/firebase'

// ************************************************
// Mailing Groups Related
// ************************************************

// create mailing group
export function inviteUserToOrganisation() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'INVITE_USER_TO_ORGANISATION') {
            const inviteUserToOrganisationCF = functions.httpsCallable('inviteUserToOrganisation');
            dispatch({
                type: "INVITE_USER_TO_ORGANISATION",
                payload: inviteUserToOrganisationCF({emailToInvite: action.payload.email}).then((res) => res.data).catch((error) => console.log(error)),
                meta: {
                    email: action.payload.email
                }
            })
        }
        return next(action)
    }
}

export function signUpToOrganisationViaToken() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SIGNUP_TO_ORGANISATION_VIA_TOKEN') {
            const acceptInviteToOrganisationCF = functions.httpsCallable('acceptInviteToOrganisation');
            dispatch({
                type: "SIGNUP_TO_ORGANISATION_VIA_TOKEN",
                payload: acceptInviteToOrganisationCF({ invitetoken: action.payload.invitetoken }).then((res) => res.data),
            })
        }
        return next(action)
    }
}

export function removeUserFromOrganisationAsAdmin() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'REMOVE_USER_FROM_ORGANISATION') {
            const removeUserFromOrganisationCF = functions.httpsCallable('removeUserFromOrganisation');
            dispatch({
                type: "REMOVE_USER_FROM_ORGANISATION",
                payload: removeUserFromOrganisationCF({ uid: action.payload.uid }).then((res) => res.data),
                meta: { uid: action.payload.uid }
            })
        }
        return next(action)
    }
}

export function promoteUserInOrganisationToAdmin() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'PROMOTE_USER_TO_ADMIN') {
            const promoteUserToOrganisationAdminCF = functions.httpsCallable('promoteUserToOrganisationAdmin');
            dispatch({
                type: "PROMOTE_USER_TO_ADMIN",
                payload: promoteUserToOrganisationAdminCF({ uid: action.payload.uid }).then((res) => res.data),
                meta: { uid: action.payload.uid }
            })
        }
        return next(action)
    }
}

const organisationInformationRef = ({organisationId}) => db.collection('organisations').doc(organisationId)
const organisationUsersRef = ({organisationId}) => db.collection('organisations').doc(organisationId).collection('users')
const organisationPendingUsersRef = ({organisationId}) => db.collection('organisations').doc(organisationId).collection('pending-users')

export function getOrganisationalInformation() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ORGANISATION_FULL_INFO') {
            const organisationRef = db.collection("organisations")
            const usersRef = db.collection('users')
            const { organisationId } = action.payload
            const { uid } = getState().user.user
            const { isSubscribedOrganisationInformation, isSubscribedOrganisationUsers, isSubscribedOrganisationPendingUsers } = getState().organisation
            if(!isSubscribedOrganisationInformation){
                dispatch({
                    type: "SUBSCRIBE_ORGANISATION_INFORMATION_OPEN"
                })
                organisationInformationRef({organisationId}).onSnapshot((doc)=>{
                    if(doc.exists){
                        dispatch({type: "NO_ORGANISATION_PENDING_USERS"})
                        dispatch({
                            type: "UPDATE_ORGANISATION_INFORMATION_IN_STORE",
                            payload:{ organisationId:organisationId, ...doc.data() }
                        })
                    } else {
                        dispatch({type: "NO_ORGANISATION_INFORMATION"})
                    }
                })
            }
            
            if(!isSubscribedOrganisationUsers){
                dispatch({
                    type: "SUBSCRIBE_ORGANISATION_USERS_OPEN"
                })
                organisationUsersRef({organisationId}).onSnapshot(async (querySnapshot)=>{
                    const state = getState()
                    let users = state.organisation.users?[...state.organisation.users]:[]
                    let promiseArray = []
                    querySnapshot.docChanges().forEach((change)=>{
                        if (change.type === "removed"){
                            users = users.filter(i=>i.userId!==change.doc.id)
                        } else {
                            promiseArray.push(usersRef.doc(change.doc.id).get().then(res=>({userId: res.id, ...res.data()})))
                            users = [...users.filter(i=>i.userId!==change.doc.id), {userId: change.doc.id, ...change.doc.data()}]
                        }
                    })
                    if (users.length>0&&promiseArray.length>0){
                        const detailedUsers = await Promise.all(promiseArray).then(res=>res.forEach(dU=>{
                            const indexOf = users.map(i=>i.userId).indexOf(dU.userId)
                            users[indexOf]={...users[indexOf], ...dU}
                        }))
                    }
                    
                    if (users.length>0){
                        dispatch({
                            type: "UPDATE_ORGANISATION_USERS_IN_STORE",
                            payload: {users: users, isCurrentUserAdmin: users[users.map(i=>i.userId).indexOf(uid)].isAdmin}
                        })
                    } else {
                        dispatch({type: "NO_ORGANISATION_USERS"})
                    }
                })
            }
            
            if(!isSubscribedOrganisationPendingUsers){
                dispatch({
                    type: "SUBSCRIBE_ORGANISATION_PENDING_USERS_OPEN"
                })
                organisationPendingUsersRef({organisationId}).onSnapshot((querySnapshot)=>{
                    const state = getState()
                    let pendingUsers = state.organisation.pendingUsers?[...state.organisation.pendingUsers]:[]
                    querySnapshot.docChanges().forEach((change)=>{
                        if (change.type === "removed"){
                            pendingUsers = pendingUsers.filter(i=>i.id!==change.doc.id)
                        } else {
                            pendingUsers = [...pendingUsers.filter(i=>i.id!==change.doc.id), {id: change.doc.id, ...change.doc.data()}]
                        }
                    })
                    if (pendingUsers.length>0){
                        dispatch({
                            type: "UPDATE_ORGANISATION_PENDING_USERS_IN_STORE",
                            payload: pendingUsers
                        })
                    } else {
                        dispatch({type: "NO_ORGANISATION_PENDING_USERS"})
                    }
                })
            }

            dispatch({
                type: "GET_ORGANISATION_FULL_INFO",
                payload: Promise.all(
                    [
                        organisationRef.doc(organisationId).collection("users").get().then(snapshot => {
                            let userData = []
                            snapshot.forEach((doc) => {
                                userData = [...userData, {userId: doc.id, ...doc.data()}]
                            })
                            return userData
                        })
                    ]).then(res => {
                        const arr = res[0].map(u=>usersRef.doc(u.userId).get().then(res=>({userId: res.id, ...res.data(), ...u})))
                        return Promise.all(arr).then(users=>(null))
                })
            })
        }
        return next(action)
    }
}

export function createNewTeamAndSetUserAsAdmin() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_NEW_TEAM') {
            const createNewTeamAndSetUserAsAdminCF = functions.httpsCallable('createNewTeamAndSetUserAsAdmin');
            const { name, website, interestCategories, organisationType } = getState().organisation.newTeamInfo
            dispatch({
                type: "CREATE_NEW_TEAM",
                payload: createNewTeamAndSetUserAsAdminCF({ name, website, interestCategories, organisationType }).then((res) => res.data),
            })
        }
        return next(action)
    }
}

export function updateOrganisationInfoAsAdmin() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'UPDATE_TEAM_INFORMATION') {
            const { organisationId, isCurrentUserAdmin } = getState().organisation
            return isCurrentUserAdmin&&dispatch({
                type: "UPDATE_TEAM_INFORMATION",
                payload: organisationInformationRef({organisationId}).update(action.payload),
            })
        }
        return next(action)
    }
}