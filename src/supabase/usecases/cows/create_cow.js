import {createNewCow} from '../../data/supabase/data_source'
export const createCow = async (id_cow, raze, gender, birth_date, user_id) => {
    return await createNewCow(id_cow, raze, gender, birth_date, user_id);
}