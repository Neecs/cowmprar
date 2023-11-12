import {
    getCowGenders,
    getCowInformation,
    getCowRazes,
    getAllCows,
    getHV,
    getUserCows,
    getIncidentTypes
} from '../../data/supabase/supabase_querys.js'

export const getCow = async (id_cow) => {
    return await getCowInformation(id_cow)
}

export const getRazes = async () => {
    return await getCowRazes()
}

export const getGenders = async () => {
    return await getCowGenders()
}

export const getIncidents = async () => {
    return await getIncidentTypes()
}

export const getAllDBCows = async () => {
    return await getAllCows()
}

export const getCowHV = async () => {
    return await getHV()
}

export const getCowsByUser = async (userId) => {
    return await getUserCows(userId)
}