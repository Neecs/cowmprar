import {getCowInformation, getCowRazes, getCowGenders} from '../../data/supabase/data_source'

export const getCow = async (id_cow) => {
    return await getCowInformation(id_cow)
}

export const getRazes = async () => {
    const razesDictionary = await getCowRazes()
    return razesDictionary
}

export const getGenders = async () => {
    return await getCowGenders()
}