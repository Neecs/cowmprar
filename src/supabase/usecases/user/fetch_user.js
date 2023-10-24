import { fetchPersonDataByEmail, getDocumentTypes, getAppRoles} from '../../data/supabase/data_source'

export const getPersonByEmail = async (email) => {
    return await fetchPersonDataByEmail(email);
}

export const getPossibleDocuments = async () => {
    return await getDocumentTypes()
}

export const getRoles = async () => {
    return await  getAppRoles()
}