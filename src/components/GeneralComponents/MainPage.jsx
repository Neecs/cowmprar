import { CowList } from "../Cows/Cards/CowList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainPage.css";
import Button from "react-bootstrap/Button";
import { supabase } from "../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        const updateUserId = async () => {
          await supabase
            .from("Person")
            .update({ user_id: session.user.id })
            .is("user_id", null)
            .select();
        };
        updateUserId();
      }
    });
  }, []);

  return (
    <div className="main-page">
      <NavBar />
      <br />
      <div className="main-page-body">
        <CowList />
        <br />
        <Link to="form-cow" id="add-new-cow">
          <Button variant="dark" id="add-cow-button">
            Agregar vaca
          </Button>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
};
