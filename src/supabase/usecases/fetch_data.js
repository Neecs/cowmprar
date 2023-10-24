import { fetchDataFromSupabase } from '../data/supabase/data_source'

export const getAllUsers = async () => {
    return await fetchDataFromSupabase();
}