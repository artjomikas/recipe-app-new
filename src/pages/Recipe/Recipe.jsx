import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Recipe.module.css";

import Bookmark from "../../components/Bookmark";
import { UserAuth } from "../../context/AuthContext";

import { db } from "../../firebase/firebase";

import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const Recipe = () => {
  const { user } = UserAuth();

  let params = useParams();

  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [favoritesList, setFavoritesList] = useState(undefined);

  const getRecipeDetails = async () => {
    const url = `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_API_KEY}`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setRecipeDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onSnapshot(doc(db, "favorites", `${user?.email}`), (doc) => {
      setFavoritesList(doc.data()?.favouritesList);
    });
  }, [user?.email]);

  useEffect(() => {
    getRecipeDetails();
  }, [params.name]);

  return (
    <div className={styles.recipe_wrapper}>
      {Object.keys(recipeDetails).length === 0 ? (
        "loading..."
      ) : (
        <div style={{ display: "flex" }}>
          <div>
            <h2 className={styles.recipe_wrapper__title}>{recipeDetails.title}</h2>
            <img src={recipeDetails.image} alt={recipeDetails.title + " image"} />
          </div>

          <div className={styles.info}>
            <button className={activeTab === "instructions" ? styles.button_active : styles.button} onClick={() => setActiveTab("instructions")}>
              Instructions
            </button>
            <button className={activeTab === "ingredients" ? styles.button_active : styles.button} onClick={() => setActiveTab("ingredients")}>
              Ingredients
            </button>

            <Bookmark recipeDetails={recipeDetails} favouritesList={favoritesList} id={params.name} />

            <div>
              {activeTab === "instructions" ? (
                <>
                  <p className={styles.list__element} dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></p>{" "}
                  <p className={styles.list__element} dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}></p>
                </>
              ) : (
                <ul className={styles.recipe_wrapper__list}>
                  {recipeDetails.extendedIngredients.map((ingredient, i) => (
                    <li key={i}>{ingredient.original}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
