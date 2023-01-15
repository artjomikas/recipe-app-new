import styles from "./Login.module.css";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const [hidden, setHidden] = useState();
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signIn(emailRef.current.value, passwordRef.current.value);
      setInfo("Successfuly logged in!");
      setSuccess(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setInfo(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__login}>
        <p className={styles.login_title}>Login</p>

        <form id="form" onSubmit={handleSubmit}>
          <div className={styles.input__field}>
            <input type="text" placeholder="Enter your email" ref={emailRef} required />
            <AiOutlineMail />
          </div>

          <div className={styles.input__field}>
            <input type={hidden ? "text" : "password"} ref={passwordRef} placeholder="Enter your password" required />
            <AiOutlineLock />
            {hidden ? (
              <AiOutlineEye className={styles.icon__hidden} onClick={() => setHidden(!hidden)} />
            ) : (
              <AiOutlineEyeInvisible className={styles.icon__hidden} onClick={() => setHidden(!hidden)} />
            )}
          </div>
        </form>

        <div className={styles.login__forgot}>
          <Link to="/reset-password">
            <p className="">Forgot password?</p>
          </Link>
        </div>

        <button className={styles.login__button} type="submit" form="form">
          Login Now
        </button>

        <div className={styles.login__signup}>
          <span>Not a member? </span>
          <Link to="/signup">
            <span className={styles.signup__title}>Signup Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
