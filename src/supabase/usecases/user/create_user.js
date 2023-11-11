import {createNewUser} from "../../data/supabase/supabase_querys.js";


export const registerUser = async (email, password, doc_id, first_name, last_name, role_id, phone, doc_type) => {
    console.log(email,password,doc_id,first_name,last_name,role_id,phone,doc_type)
    return await createNewUser(
        email,
        password,
        doc_id,
        first_name,
        last_name,
        role_id,
        phone,
        doc_type
    )
};