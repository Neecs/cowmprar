import { fetchDataFromSupabase } from '../data/supabase/supabase_querys.js'

export const getAllUsers = async () => {
    return await fetchDataFromSupabase();
}