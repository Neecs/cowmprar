import {updateCowHistory} from '../../data/supabase/data_source'

export const updateHistory = async (cow_id, feed, color, name, photo, id_hato, id_history) => {
    return await updateCowHistory(cow_id, name, color, photo, id_hato, id_history)
}
