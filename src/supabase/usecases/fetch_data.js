import {fetchDataFromSupabase, getSellers} from '../data/supabase/supabase_querys.js'

export const getAllUsers = async () => {
    return await fetchDataFromSupabase();
}

export const getAllSellers = async () => {
    return await getSellers();
}