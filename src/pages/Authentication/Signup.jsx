import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineCheck } from "react-icons/ai";
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

  const navigate = useNavigate();
  const { signUp, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signUp(emailRef.current.value, passwordRef.current.value);
      console.log(emailRef.current.value, passwordRef.current.value);
      setInfo("Successfuly registered!");
      setSuccess(true);
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
            <input type="text" placeholder="Create password" ref={passwordRef} required />
            <AiOutlineLock />
          </div>

          <div className={styles.input__field}>
            <input type="text" placeholder="Confirm password" ref={passwordConfirmRef} required />
            <AiOutlineLock />
          </div>

          <button className={styles.signup__button} type="submit">
            Register Now
          </button>
        </form>

        <div className={styles.info__text}>
          {success && (
            <>
              {info} <AiOutlineCheck />
            </>
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
