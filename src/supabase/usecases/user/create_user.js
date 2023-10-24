import {createNewUser} from "../../data/supabase/data_source.js";


export const registerUser = async (email, password) => {
    console.log(email, password)
    return await createNewUser(
        email,
        password
    )
};
