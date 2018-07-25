import { db } from '../../config/firebase'
const organisationRef = db.collection("organisations")

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
        })]).then(res => ({...res[0], users: res[1]}))
    }
}