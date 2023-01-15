import React from "react";
import { UserAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const ButtonLogin = () => {
  const { user, logout } = UserAuth();
  
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user != null ? (
        <div className={styles.signout__container}>
          <Link to="/edit">
            <div>
              <button className={styles.login__button}>Edit profile</button>
            </div>
          </Link>

          <div>
            <button className={styles.login__button} onClick={() => handleSignOut()}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <div>
            <button className={styles.login__button}>Login</button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ButtonLogin;
