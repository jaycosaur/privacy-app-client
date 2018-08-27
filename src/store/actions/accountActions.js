import { db, auth } from '../../config/firebase'
import { message } from 'antd'

const usersRef = db.collection("users")

export const createOrganisationFromFields = ({ name, website, companySize }) => {
    return {
        type: 'CREATE_NEW_TEAM_FROM_FIELDS',
        payload: {  name, website, companySize  }
    }
}

export const setNewAccountPassword = ({ newPassword, oldPassword }) => {
    return {
        type: 'SET_NEW_ACCOUNT_PASSWORD',
        payload: auth.signInWithEmailAndPassword(auth.currentUser.email, oldPassword).then(res=>{
            return auth.currentUser.updatePassword(newPassword)
        })
    }
}

export const doSelectItem = (item) => {
    return {
        type: 'MODAL_SELECT_ITEM',
        payload: item
    }
}

export const updateOrganisationName = ({organisationName, organisationWebsite}) => {
    return {
        type: 'UPDATE_ORGANISATION_INFO',
        payload: usersRef.doc(auth.currentUser.uid).update({
            organisation: organisationName,
            organisationWebsite
        }).then(e => message.success('Updated Organisation details.', 5)).catch(e => message.error('Error updating Organisation details.', 5))
    }
}

export const handleFormFieldChange = ({fieldId, val}) => {
    return {
        type: 'HANDLE_ACCOUNT_FORM_FIELD_CHANGE',
        payload: {key: fieldId, value: val}
    }
}

export const updateAccountInformation = (input) => {
    const { email, displayName } = input
    return {
        type: 'UPDATE_ACCOUNT_INFORMATION',
        payload: usersRef.doc(auth.currentUser.uid).update({
            ...input
        })
    }
}

export const getAccountInformation = () => {
    return {
        type: 'GET_ACCOUNT_INFORMATION'
    }
}

export const getUserRecentSearches = ({organisationName, organisationWebsite}) => {
    return {
        type: 'UPDATE_ORGANISATION_INFO',
        payload: usersRef.doc(auth.currentUser.uid).update({
            organisation: organisationName,
            organisationWebsite
        }).then(e => message.success('Updated Organisation details.', 5)).catch(e => message.error('Error updating Organisation details.', 5))
    }
}

export const sendVerificationEmail = () => {
    return {
        type: "SEND_USER_VERIFICATION_EMAIL"
    }
}