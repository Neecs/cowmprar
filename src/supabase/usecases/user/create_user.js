import {createNewUser} from "../../data/supabase/data_source.js";


export const registerUser = async (email, password) => {
    return await createNewUser(
        email,
        password
    )
};