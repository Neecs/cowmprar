import {getCowGenders, getCowInformation, getCowRazes, getAllCows, getHV, getUserCows} from '../../data/supabase/data_source'

export const getCow = async (id_cow) => {
    return await getCowInformation(id_cow)
}

export const getRazes = async () => {
    return await getCowRazes()
}

export const getGenders = async () => {
    return await getCowGenders()
}

export const getAllUserCows = async () => {
    return await getAllCows()
}

export const getCowHV = async () => {
    return await getHV()
}

export const getCowsByUser = async (userId) => {
    return await getUserCows(userId)
}