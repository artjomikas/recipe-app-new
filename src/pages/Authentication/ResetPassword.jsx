import { UserAuth } from "../../context/AuthContext";
import styles from "./ResetPassword.module.css";
import { useState, useRef } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const { resetPassword } = UserAuth();
  const emailRef = useRef();
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      resetPassword(emailRef.current.value);
      setInfo("Email has been sent, please check your email!");
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__reset}>
        <p className={styles.reset_title}>Reset password</p>

        <form id="form" onSubmit={handleSubmit}>
          <div className={styles.input_field}>
            <input type="text" placeholder="Enter your email" ref={emailRef} required />
            <AiOutlineMail />
          </div>
        </form>

        <button className={styles.reset_button} type="submit" form="form">
          Reset
        </button>

        <div className={styles.info__text}>{success && <>{info}</>}</div>
      </div>
    </div>
  );
};

export default ResetPassword;
