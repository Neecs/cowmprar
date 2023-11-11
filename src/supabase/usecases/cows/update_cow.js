import {updateHV, addIncident} from '../../data/supabase/supabase_querys.js'

export const updateHistory = async (color, name, id_hato, person_id) => {
    return await updateHV(color,name, id_hato, person_id)
}

export const addCowIncident = async (name,dateIn,description,cowId) => {
    return await addIncident(name,dateIn,description,cowId)
}