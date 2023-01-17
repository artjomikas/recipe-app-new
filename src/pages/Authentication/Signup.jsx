import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineCheck, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hiddenForConfirmPass, setHiddenForConfirmPass] = useState(false);

  const navigate = useNavigate();
  const { signUp, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordConfirmRef.current.value != passwordRef.current.value) {
      setInfo("Passwords do not match");
      return;
    }
    try {
      signUp(emailRef.current.value, passwordRef.current.value);
      console.log(emailRef.current.value, passwordRef.current.value);
      setInfo("Successfuly registered!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      setInfo(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__signup}>
        <p className={styles.signup_title}>Registration</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.input__field}>
            <input type="text" placeholder="Enter your name" ref={nameRef} required />
            <AiOutlineUser />
          </div>

          <div className={styles.input__field}>
            <input type="text" placeholder="Enter your email" ref={emailRef} required />
            <AiOutlineMail />
          </div>

          <div className={styles.input__field}>
            <input type={hidden ? "text" : "password"} ref={passwordRef} placeholder="Create password" required />
            <AiOutlineLock />
            {hidden ? (
              <AiOutlineEye className={styles.icon__hidden} onClick={() => setHidden(!hidden)} />
            ) : (
              <AiOutlineEyeInvisible className={styles.icon__hidden} onClick={() => setHidden(!hidden)} />
            )}
          </div>

          <div className={styles.input__field}>
            <input type={hiddenForConfirmPass ? "text" : "password"} ref={passwordConfirmRef} placeholder="Confirm password" required />
            <AiOutlineLock />
            {hiddenForConfirmPass ? (
              <AiOutlineEye className={styles.icon__hidden} onClick={() => setHiddenForConfirmPass(!hiddenForConfirmPass)} />
            ) : (
              <AiOutlineEyeInvisible className={styles.icon__hidden} onClick={() => setHiddenForConfirmPass(!hiddenForConfirmPass)} />
            )}
          </div>

          <button className={styles.signup__button} type="submit">
            Register Now
          </button>
        </form>

        <div className={success ? styles.info__text : styles.error__text}>
          {success ? (
            <>
              {info} <AiOutlineCheck />
            </>
          ) : (
            { info }
          )}
        </div>

        <div className={styles.signup__signup}>
          <span>Already have an account? </span>

          <Link to="/login">
            <span className={styles.signup__title}>Login Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
