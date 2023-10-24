import {updateHV} from '../../data/supabase/data_source'

export const updateHistory = async (cow_id, feed, color, name, photo, id_hato, person_id) => {
    return await updateHV(color,name, photo, id_hato, person_id)
}
