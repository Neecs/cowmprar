import { createNewUser } from "../../data/supabase/supabase_querys.js";

export const registerUser = async (
  email_persona,
  password,
  documento_persona,
  nombre_persona,
  apellido_persona,
  telefono_persona,
  id_tipo_documento
) => {
  return await createNewUser(
    email_persona,
    password,
    documento_persona,
    nombre_persona,
    apellido_persona,
    telefono_persona,
    id_tipo_documento
  );
};
