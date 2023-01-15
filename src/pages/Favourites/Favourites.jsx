import { useState, useEffect } from "react";
import styles from "./Favourites.module.css";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const Favourites = () => {
  const { user } = UserAuth();

  const [favoritesList, setFavoritesList] = useState(undefined);

  useEffect(() => {
    onSnapshot(doc(db, "favorites", `${user?.email}`), (doc) => {
      setFavoritesList(doc.data()?.favouritesList);
    });
  }, [user?.email]);

  return (
    <div className={styles.grid}>
      {favoritesList?.map((item, i) => {
        return (
          <div key={i} className={styles.grid__card}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title}></img>
              <h4>{item.title}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Favourites;
