import { db } from './../../config/firebase'
import moment from 'moment'

// ************************************************
// Mailing Groups Related
// ************************************************

const mailingGroupsRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('mailing-groups')
const mailingGroupRef = ({ organisationId, groupId }) => db.collection("organisations").doc(organisationId).collection('mailing-groups').doc(groupId)

//subscribe/get mailing groups
export function subscribeToOrganisationMailingGroups() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ORGANISATION_MAILING_GROUPS') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = mailingGroupsRef({ organisationId })
            dispatch({
                type: "SUBSCRIBED_TO_ORGANISATION_MAILING_GROUPS"
            })
            ref.onSnapshot(function(querySnapshot) {
                const state = getState()
                querySnapshot.docChanges().forEach((change) => {
                    const payload = {
                        id: change.doc.id, 
                        ...change.doc.data(), 
                    }
                    if (change.type === "removed"){
                        dispatch(
                            {
                                type: "DELETE_MAILING_GROUP",
                                payload: payload,
                                meta: { id: payload.id}
                            }
                        )
                    } else {
                        dispatch(
                            {
                                type: "UPDATE_MAILING_GROUP",
                                payload: payload,
                                meta: { id: payload.id}
                            }
                        )
                    }
                })
            })
        }
        return next(action)
    }
}

// create mailing group
export function createOrganisationMailingGroup() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_ORGANISATION_MAILING_GROUP') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = mailingGroupsRef({ organisationId })
            return dispatch({
                type: "CREATE_ORGANISATION_MAILING_GROUP",
                payload: ref.add({
                    title: null,
                    members: [],
                    createdBy: uid,
                    createdOn: moment().toISOString()
                })
            })
        }
        return next(action)
    }
}

// delete mailing group
export function deleteOrganisationMailingGroup() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'LOCAL_DELETE_MAILING_GROUP') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = mailingGroupRef({ organisationId, groupId: action.meta.id })
            return dispatch({
                type: "LOCAL_DELETE_MAILING_GROUP",
                payload: ref.delete(),
                meta: action.meta
            })
        }
        return next(action)
    }
}

// update mailing group
export function updateOrganisationMailingGroup() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'LOCAL_UPDATE_MAILING_GROUP') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = mailingGroupRef({ organisationId, groupId: action.meta.id })
            return dispatch({
                type: "LOCAL_UPDATE_MAILING_GROUP",
                payload: ref.update({
                    ...action.payload,
                    lastUpdated: moment().toISOString()
                }),
                meta: action.meta
            })
        }
        return next(action)
    }
}

// ************************************************
// Digest Related
// ************************************************


const digestsRef = ({ organisationId }) => db.collection("organisations").doc(organisationId).collection('digests')
const digestRef = ({ organisationId, id }) => db.collection("organisations").doc(organisationId).collection('digests').doc(id)

// subscribe / get digests
export function subscribeToOrganisationDigests() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ORGANISATION_DIGESTS') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = digestsRef({ organisationId })
            dispatch({
                type: "SUBSCRIBED_TO_ORGANISATION_DIGESTS"
            })
            ref.onSnapshot(function(querySnapshot) {
                const state = getState()
                querySnapshot.docChanges().forEach((change) => {
                    const payload = {
                        id: change.doc.id, 
                        ...change.doc.data(), 
                    }
                    if (change.type === "removed"){
                        dispatch(
                            {
                                type: "DELETE_DIGEST",
                                payload: payload,
                                meta: { id: payload.id}
                            }
                        )
                    } else {
                        dispatch(
                            {
                                type: "UPDATE_DIGEST",
                                payload: payload,
                                meta: { id: payload.id}
                            }
                        )
                    }
                })
            })
        }
        return next(action)
    }
}

// create digest
export function createOrganisationDigest() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_ORGANISATION_DIGEST') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = digestsRef({ organisationId })
            return dispatch({
                type: "CREATE_ORGANISATION_DIGEST",
                payload: ref.add({
                    createdOn: moment().toISOString(),
                    createdBy: uid,
                })
            })
        }
        return next(action)
    }
}

// delete digest
export function deleteOrganisationDigest() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'LOCAL_DELETE_DIGEST') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = digestRef({ organisationId, id: action.meta.id })
            return dispatch({
                type: "LOCAL_DELETE_DIGEST",
                payload: ref.delete(),
                meta: action.meta
            })
        }
        return next(action)
    }
}

// update digest
export function updateOrganisationDigest() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'LOCAL_UPDATE_DIGEST') {
            const { organisation: { organisationId }, user: { user: { uid } } } = getState()
            const ref = digestRef({ organisationId, id: action.meta.id })
            return dispatch({
                type: "LOCAL_UPDATE_DIGEST",
                payload: ref.update({
                    ...action.payload,
                    lastUpdated: moment().toISOString()
                }),
                meta: action.meta
            })
        }
        return next(action)
    }
}

    /* digest = {
        isSending: false,
        isScheduled: false,
        isSent: false,
        scheduledFor: null,
        sentOn: null,
        recipients: [],
        title: null,
        footer: null,
        headerMessage: null,
        items: [
            {
                id: null,
                message: null
            },
        ]
    } */

// addRecordInDigest

// deleteRecordInDigest

// updateRecordInDigest

// submit digest for mailing
    // update digest for sending flag to true

// submit digest for a scheduled mailing
    // update is scheduled flag











