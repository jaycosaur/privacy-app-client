export const createOrganisationMailingGroup = () => {
    return {
        type: 'CREATE_ORGANISATION_MAILING_GROUP'
    }
}

export const createOrganisationDigest = () => {
    return {
        type: 'CREATE_ORGANISATION_DIGEST'
    }
}

export const deleteOrganisationMailingGroup = (id) => {
    return {
        type: 'LOCAL_DELETE_MAILING_GROUP',
        meta: { id }
    }
}

export const deleteOrganisationDigest = (id) => {
    return {
        type: 'LOCAL_DELETE_DIGEST',
        meta: { id }
    }
}

export const getOrganisationDigests = () => {
    return {
        type: 'GET_ORGANISATION_DIGESTS'
    }
}

export const getOrganisationMailingGroups = () => {
    return {
        type: 'GET_ORGANISATION_MAILING_GROUPS'
    }
}

export const updateOrganisationMailingGroup = ({ id, members, title }) => {
    return {
        type: 'LOCAL_UPDATE_MAILING_GROUP',
        payload: ({
            members,
            title
        }),
        meta: { id }
    }
}




