import { db, auth } from './../../config/firebase'
import { message } from 'antd'


const legislationRef = db.collection("legislation")
const usersRef = db.collection("users")


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