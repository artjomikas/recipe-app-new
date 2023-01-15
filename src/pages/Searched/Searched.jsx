import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Searched.module.css";
import { Link } from "react-router-dom";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  let params = useParams();

  const getSearched = async (name) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${name}`;

    await axios
      .get(url)
      .then((response) => {
        const data = response.data.results;
        setSearchedRecipes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <div className={styles.grid}>
      {searchedRecipes.length == 0 && <div>Nothing was found.</div>}
      {searchedRecipes.map((item, i) => {
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

export default Searched;
