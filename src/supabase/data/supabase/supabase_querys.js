import { supabase } from "../constants/api_credentials.js";

export const fetchDataFromSupabase = async () => {
  const { data, error } = await supabase.from("Person").select("*");
  if (error) throw error;
  return data;
};

export const checkUserLogin = async (email, password) => {
  const { data, error } = await supabase
    .from("Person")
    .select("passwordHash")
    .eq("email", email)
    .eq("password", password)
    .single();
  if (error) {
    console.error("Error obteniendo la contraseña:", error.message);
    return null;
  } else {
    return true;
  }
};

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
  return user;
};
export const createNewUser = async (
  email_persona,
  password,
  documento_persona,
  nombre_persona,
  apellido_persona,
  id_rol,
  telefono_persona,
  id_tipo_documento
) => {
  try {
    const { data: createUser, error } = await supabase.from("Person").insert({
      email_persona,
      documento_persona,
      nombre_persona,
      apellido_persona,
      id_rol,
      telefono_persona,
      id_tipo_documento,
    });
    console.log(createUser, error);

    const { authData: createAuthUser, errorAuth } = await supabase.auth.signUp({
      email: email_persona,
      password: password,
    });
    console.log(createAuthUser, errorAuth);
    return true;
  } catch (error) {
    return error;
  }
};

export const fetchPersonDataByEmail = async (email) => {
  const { data, error } = await supabase
    .from("Person")
    .select("*")
    .eq("email_persona", email);
  if (error) throw error;
  return data.length > 0;
};

// TODO no es registrar usuario sino actualizar usuario
export const updateUser = async (
  doc_id,
  first_name,
  last_name,
  role_id,
  phone,
  doc_type
) => {
  try {
    if (!(await fetchPersonDataByEmail(user.email))) {
      await supabase.from("Person").insert({
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

export const createNewCow = async (raze, birth_date, gender, name, userId) => {
  try {
    const { data, error } = await supabase
      .from("Vacas")
      .insert([
        {
          raza_vaca: raze,
          fecha_nacimiento: birth_date,
          id_genero: gender,
          nombre_vaca: name,
          userId: userId,
        },
      ])
      .select();
    console.log(data, error);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateCowHistory = async (
  id_vaca,
  feed,
  color,
  name,
  photo,
  id_hato,
  id_history
) => {
  try {
    await supabase
      .from("Cow")
      .update({
        feed,
        color,
        name,
        photo,
        id_hato,
        id_history,
      })
      .eq(id_vaca);
    return true;
  } catch (error) {
    return false;
  }
};

export const getCowRazes = async () => {
  try {
    const { data: cowRazes, error } = await supabase
      .from("Razas Vaca")
      .select("*");
    const dictionaryRaze = {};
    cowRazes.forEach((item) => {
      dictionaryRaze[item.id_raza] = item.raza_vaca;
    });
    return dictionaryRaze;
  } catch (error) {
    console.error(error);
  }
};

export const getCowInformation = async (id_vaca) => {
  try {
    const { data: cowData, error } = await supabase
      .from("Vacas")
      .select("*")
      .eq("id_vaca", id_vaca);

    return cowData;
  } catch (error) {
    console.error(error);
  }
};

export const getCowGenders = async () => {
  try {
    const { data: cowGenders, error } = await supabase
      .from("generos vaca")
      .select("*");
    const dictionaryGender = {};
    cowGenders.forEach((item) => {
      dictionaryGender[item.id_genero] = item.genero;
    });
    return dictionaryGender;
  } catch (error) {
    console.error(error.message);
  }
};

export const getDocumentTypes = async () => {
  try {
    const { data: docTypes, error } = await supabase
      .from("Tipo documento")
      .select("*");
    const dictionaryDocTypes = {};
    docTypes.forEach((element) => {
      dictionaryDocTypes[element.id_tipo_documento] = element.tipo_documento;
    });
    return dictionaryDocTypes;
  } catch (error) {
    console.error(error);
  }
};

export const getAppRoles = async () => {
  try {
    const { data: appRoles, error } = await supabase.from("roles").select("*");
    console.log(appRoles);
    const rolesDictionary = {};
    appRoles.forEach((element) => {
      rolesDictionary[element.id_rol] = element.descripcion_rol;
    });
    return rolesDictionary;
  } catch (error) {
    console.error(error);
  }
};

export const getIncidentTypes = async () => {
  try {
    const { data: incidentes, error } = await supabase
      .from("Tipos incidentes")
      .select("*");
    const dictionaryIncidents = {};
    incidentes.forEach((item) => {
      dictionaryIncidents[item.id_incidente] = item.nombre_incidente;
    });
    return dictionaryIncidents;
  } catch (error) {
    console.log(error);
  }
};

export const recoverPasswordViaEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCows = async () => {
  try {
    const { data: cowData, error } = await supabase.from("Vacas").select("*");
    return cowData;
  } catch (error) {
    console.log(error);
  }
};

export const getHV = async () => {
  try {
    const { data: hvData, error } = await supabase
      .from("Hojas de vida")
      .select("*");
    return hvData;
  } catch (error) {
    console.log(error);
  }
};

export const updateHV = async (color, nombre, id_hato, id_persona) => {
  try {
    await supabase
      .from("Hojas de vida")
      .update({
        color,
        id_hato,
        id_persona,
      })
      .eq("id_hoja_vida");
    return true;
  } catch (error) {
    return false;
  }
};

export const createUserForm = async (user) => {
  try {
    if (!(await fetchPersonDataByEmail(user.email))) {
      await supabase.from("Person").insert({
        email: user.email,
        user_id: user.id,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserCows = async (userId) => {
  try {
    const { data: cowData, error } = await supabase
      .from("Vacas")
      .select("*")
      .eq("userId", userId);
    return cowData;
  } catch (error) {
    console.log(error);
  }
};

export const addIncident = async (id_incidente, dateIn, description, cowId) => {
  try {
    const { data: cowIncident, error } = await supabase
      .from("Historiales")
      .insert([
        {
          id_incidente,
          fecha_incidente: dateIn,
          descripcion: description,
          id_hoja_vida: cowId,
        },
      ]);
  } catch (error) {
    console.log(error);
  }
};

export const getCowStatus = async () => {
  try {
    let { data: cow_status, error } = await supabase
      .from("cow_status")
      .select("*");
    return cow_status;
  } catch (error) {
    console.log(error);
  }
};

export const getHerdsPlaces = async () => {
  try {
    let { data: herds, error } = await supabase.from("Hato").select("*");
    return herds;
  } catch (error) {
    console.log(error);
  }
};

export const getDepartmentsLocation = async () => {
  try {
    let { data: departments, error } = await supabase
      .from("Departamentos")
      .select("*");
    return departments;
  } catch (error) {
    console.log(error);
  }
};

export const addHerdLocation = async (nombre_hato, id_departamento) => {
  try {
    const { data, error } = await supabase
      .from("Hato")
      .insert([{ nombre_hato, id_departamento }])
      .select();
  } catch (error) {
    console.log(error);
  }
};
