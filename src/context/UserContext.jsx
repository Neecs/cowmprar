import { createContext, useEffect, useState } from "react";
import { getPossibleDocuments } from "../supabase/usecases/user/fetch_user";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [documentTypes, setDocumentTypes] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const documents = await getPossibleDocuments();
    setDocumentTypes(documents);
  };

  return (
    <UserContext.Provider value={{ documentTypes }}>
      {props.children}
    </UserContext.Provider>
  );
};
