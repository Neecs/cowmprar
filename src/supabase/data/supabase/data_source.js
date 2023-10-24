import { supabase } from "../constants/api_credentials.js";

export const fetchDataFromSupabase = async () => {
  const { data, error } = await supabase.from("Person").select("*");
  if (error) throw error;
  return data;
};

export const checkUserLogin = async (email,password) => {
  const { data, error } = await supabase
      .from('Person')
      .select('passwordHash')
      .eq('email', email)
      .eq('password',password)
      .single();
  if (error) {
    console.error('Error obteniendo la contraseña:', error.message);
    return null;
  }else{
      return true
  }
}

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
  return user;
};
 export const createNewUser = async (email, password) => {
  try {
      const {user, error:authError} = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if( authError ) {
        console.error("Error en el registro", authError)
        return false
      }
      console.log(user)
/*
      const {data, error: insertError} = await supabase.from('Person')
          .insert({
            id:user.id,
            doc_id:doc_id,
            first_name:first_name,
            last_name:last_name,
            role_id:role_id,
            phone:phone,
            doc_type:doc_type
          });
*/
      return true
      /*

      await supabase.from('public."Person"').upsert([
        {
          email: email,
          doc_type:doc_type,
          doc_id:doc_id,
          first_name:first_name,
          last_name:last_name,
          role_id:role_id,
          phone:phone
        }
      ])*/
  } catch (error) {
    return error;
  }
};

export const fetchPersonDataByEmail = async (email) => {
  const { data, error } = await supabase
    .from("Person")
    .select("*")
    .eq("email", email);
  if (error) throw error;
  return data.length > 0;
};

export const registerUser = async (
  email,
  passwordHash,
  doc_id,
  first_name,
  last_name,
  role_id,
  phone,
  doc_type
) => {
  try {
    if (!(await fetchPersonDataByEmail(email))) {
      await supabase.from("Person").insert({
        email,
        passwordHash,
        doc_id,
        first_name,
        last_name,
        role_id,
        phone,
        doc_type,
      });
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
};

export const recoverUserPassword = async (email, new_password) => {
  try {
    await supabase
      .from("Person")
      .update({ passwordHash: new_password })
      .eq("email", email);
    return true;
  } catch (error) {
    return error;
  }
};

export const createNewCow = async(raze, gender, hv_cow, birth_date) => {
  try {
    await supabase
        .from("Cow")
        .insert({
          raze,
          gender,
          hv_cow,
          birth_date
        });
    return true;
  }catch (error){
    return false;
  }
}

export const updateCowHistory = async (id_vaca, feed, color, name, photo, id_hato, id_history) => {
  try {
    await supabase
        .from("Cow")
        .update({
          feed,
          color,
          name,
          photo,
          id_hato,
          id_history
        })
            .eq(id_vaca);
    return true
  }catch (error){
    return false
  }
}

export const getCowRazes = async () => {
  try {
    const {data:cowRazes, error} = await supabase
        .from('Razas Vaca')
        .select('*')
    const dictionaryRaze = {};
    cowRazes.forEach(item => {
        dictionaryRaze[item.id_raza] = item.raza_vaca
    })
    return dictionaryRaze
  }catch (error){
    console.error(error)
  }
}

export const getCowInformation = async (id_vaca) => {
    try {
        const {data:cowData, error} = await supabase
            .from('Vacas')
            .select('*')
            .eq("id_vaca",id_vaca)

        return cowData
    } catch (error){
        console.error(error)
    }
}

export const getCowGenders = async () => {
    try {
        const {data:cowGenders, error} = await supabase
            .from('generos vaca')
            .select('*')
        const dictionaryGender = {};
        cowGenders.forEach(item => {
            dictionaryGender[item.id_genero] = item.genero
        })
        return dictionaryGender
    } catch (error){
        console.error(error.message)
    }
}

export  const getDocumentTypes = async () => {
    try {
        const {data:docTypes, error} = await supabase
            .from('Tipo documento')
            .select('*')
        const dictionaryDocTypes = {};
        docTypes.forEach(element => {
            dictionaryDocTypes[element.id_tipo_documento] = element.tipo_documento
        })
        return dictionaryDocTypes
    }catch (error){
        console.error(error)
    }
}

export const getAppRoles = async () => {
    try {
        const {data:appRoles, error} = await supabase
            .from('roles')
            .select('*')
        console.log(appRoles)
        const rolesDictionary = {};
        appRoles.forEach(element => {
            rolesDictionary[element.id_rol] = element.descripcion_rol
        })
        return rolesDictionary
    }catch (error) {
        console.error(error)
    }
}

export const recoverPasswordViaEmail = async(email) => {
    try {
        const { data, error } = await supabase.auth
            .resetPasswordForEmail(email)


        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth
                    .updateUser({ password: newPassword })

                if (data) alert("Password updated successfully!")
                if (error) alert("There was an error updating your password.")
            }
        })
        return true
    }catch (error) {
        console.error(error)
    }
}