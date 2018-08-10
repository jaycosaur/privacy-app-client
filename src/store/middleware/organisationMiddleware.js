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

export function getOrganisationalInformation() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ORGANISATION_FULL_INFO') {
            const organisationRef = db.collection("organisations")
            const usersRef = db.collection('users')
            const { organisationId } = action.payload
            const { uid } = getState().user.user
            dispatch({
                type: "GET_ORGANISATION_FULL_INFO",
                payload: Promise.all([organisationRef.doc(organisationId).get().then(res => {
                    return {organisationId:organisationId, ...res.data()}
                }), organisationRef.doc(organisationId).collection("users").get().then(snapshot => {
                    let userData = []
                    snapshot.forEach((doc) => {
                        userData = [...userData, {userId: doc.id, ...doc.data()}]
                    })
                    return userData
                })]).then(res => {
                    const arr = res[1].map(u=>usersRef.doc(u.userId).get().then(res=>({userId: res.id, ...res.data(), ...u})))
                    return Promise.all(arr).then(users=>({...res[0], users: users, isCurrentUserAdmin: res[1][res[1].map(i=>i.userId).indexOf(uid)].isAdmin}))
                })
            })
        }
        return next(action)
    }
}