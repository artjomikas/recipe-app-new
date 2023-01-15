import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./Cuisine.module.css";

const Cuisine = (props) => {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams();

  const getCuisine = async (name) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}&number=8`;

    await axios
      .get(url)
      .then((response) => {
        const data = response.data.results;
        setCuisine(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <div className={styles.grid}>
      {cuisine.map((item, i) => {
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

export default Cuisine;
