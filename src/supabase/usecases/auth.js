import {recoverUserPassword, checkUserLogin, recoverPasswordViaEmail} from "../data/supabase/data_source.js";

export const loginUser = async (email, password) => {
    return await checkUserLogin(email, password)
};

export const recoverPassword = async (email, new_password) => {
    return await recoverUserPassword(email,new_password);
}

export const recoverPasswordByEmail = async (email) => {
    return await recoverPasswordViaEmail(email)

}