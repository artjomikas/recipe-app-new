import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";
import { UserAuth } from "../../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import ButtonLogin from "./ButtonLogin";
import { AiFillStar } from "react-icons/ai";

const Header = () => {
  const [input, setInput] = useState("");
  const { user } = UserAuth();

  const navigate = useNavigate();

  const subminHandler = (e) => {
    e.preventDefault();
    input.length === 0 ? navigate("/") : navigate("/searched/" + input);
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.header__block}>
          <GiKnifeFork />
          <p className={styles.header__title}>Deliccusss</p>
        </div>
      </Link>
      <form className={styles.form} onSubmit={subminHandler}>
        <FaSearch />
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      </form>

      <div className={styles.header__right}>
        {user?.email != null && (
          <Link to="/favourites">
            <div className={styles.favourites} title="Bookmarks">
              <AiFillStar />
            </div>
          </Link>
        )}

        <ButtonLogin />
      </div>
    </div>
  );
};

export default Header;
