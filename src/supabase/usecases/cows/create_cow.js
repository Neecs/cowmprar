import {createNewCow} from '../../data/supabase/supabase_querys.js'
export const createCow = async (raze, gender, birth_date,name, userId) => {
    return await createNewCow(raze, birth_date,gender,name, userId);
}