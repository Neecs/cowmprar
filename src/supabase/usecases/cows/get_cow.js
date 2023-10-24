import {getCowGenders, getCowInformation, getCowRazes, getAllCows} from '../../data/supabase/data_source'

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