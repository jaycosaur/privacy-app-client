import { db } from '../../config/firebase'
const organisationRef = db.collection("organisations")
const usersRef = db.collection('users')

export const getOrganisationIdddformation = ({ organisationId }) => {
    return {
        type: 'GET_ORGANISATION_FdddULL_INFO',
        payload: Promise.all([organisationRef.doc(organisationId).get().then(res => {
            return {organisationId:organisationId, ...res.data()}
        }), organisationRef.doc(organisationId).collection("users").get().then(snapshot => {
            let userData = []
            snapshot.forEach((doc) => {
                userData = [...userData, {userId: doc.id, ...doc.data()}]
            })
            return userData
        })]).then(res => ({...res[0], users: res[1]}))
    }
}

export const getOrganisationInformation = ({ organisationId }) => {
    return {
        type: 'GET_ORGANISATION_FULL_INFO',
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
            return Promise.all(arr).then(users=>({...res[0], users: users}))
        })
    }
}