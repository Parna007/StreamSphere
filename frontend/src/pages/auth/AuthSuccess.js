import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    const userId =
    params.get("userId");  

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

     if (userId) {

        localStorage.setItem(
          "userId",
          userId
        );

      }
      setTimeout(() => {
        navigate("/home");
        console.log("Token stored, navigating to home");
      }, 1000);
    } else {
      navigate("/"); // Redirect to login if no token
    }

  }, [navigate]);

  return <h2>Logging in...</h2>;
};

export default AuthSuccess;