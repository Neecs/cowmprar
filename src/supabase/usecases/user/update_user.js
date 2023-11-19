import {
  updateUserPhone,
  updateUserEmail,
} from "../../data/supabase/supabase_querys";

export const updatePhone = async (telefono_persona, user_id) => {
  await updateUserPhone(telefono_persona, user_id);
};

export const updateEmail = async (email_persona, user_id) => {
  await updateUserEmail(email_persona, user_id);
};
