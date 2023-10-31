import {createNewCow} from '../../data/supabase/data_source'
export const createCow = async (raze, gender, birth_date,name, userId) => {
    return await createNewCow(raze, birth_date,gender,name, userId);
}