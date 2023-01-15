import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Recipes = (props) => {
  const type = props.type;
  const elementsInSlider = parseInt(props.elementsInSlider);

  const url = `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=13`;

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const check = localStorage.getItem(type);

    if (check) {
      setRecipes(JSON.parse(check));
    } else {
      await axios
        .get(url)
        .then((response) => {
          const data = response.data.recipes;
          localStorage.setItem(type, JSON.stringify(data));
          setRecipes(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getRecipes();
  }, [url]);

  return (
    <div className={styles.recipes}>
      <h3>{props.title}</h3>
      <Splide
        options={{
          perPage: elementsInSlider,
          arrows: false,
          pagination: false,
          dag: "free",
          gap: "5rem",
        }}
      >
        {recipes.map((recipe, i) => {
          return (
            <SplideSlide key={i}>
              <div className={styles.recipes__card}>
                <Link to={"/recipe/" + recipe.id}>
                  <p className={styles.card__title}>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <div className={styles.card__gradient}></div>
                </Link>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Recipes;
