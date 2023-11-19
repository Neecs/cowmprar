/**
 * React component representing the main page of the application.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the MainPage component.
 */
import { CowList } from "../Cows/Cards/CowList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainPage.css";
import Button from "react-bootstrap/Button";
import { supabase } from "../../supabase/data/constants/api_credentials.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";

/**
 * @function
 * @description Functional component representing the main page of the application.
 * @returns {JSX.Element} JSX representation of the MainPage component.
 */
export const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated on each state change
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        // Redirect to the login page if the user is not authenticated
        navigate("/login");
      } else {
        // Update the user ID in the Person table
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

  // JSX representation of the MainPage component
  return (
    <div className="main-page">
      {/* Navigation bar component */}
      <NavBar />
      <div className="main-page-body">
        {/* List of cows component */}
        <CowList />
        <br />
        {/* Button to navigate to the cow registration form */}
        <Button variant="dark" id="add-cow-button" href="form-cow">
          Agregar vaca
        </Button>
      </div>
    </div>
  );
};
