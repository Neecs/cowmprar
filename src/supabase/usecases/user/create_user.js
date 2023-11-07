import {createNewUser} from "../../data/supabase/supabase_querys.js";


export const registerUser = async (email, password) => {
    return await createNewUser(
        email,
        password
    )
};