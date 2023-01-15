import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import styles from "./Category.module.css";

const Category = () => {
  return (
    <div className={styles.category}>
      <NavLink to={"/cuisine/Italian"} className={({ isActive }) => (isActive ? styles.category__nav_active : styles.category__nav)}>
        <FaPizzaSlice />
        <h4 className={styles.nav__title}>Italian</h4>
      </NavLink>

      <NavLink to={"/cuisine/American"} className={({ isActive }) => (isActive ? styles.category__nav_active : styles.category__nav)}>
        <FaHamburger />
        <h4 className={styles.nav__title}>American</h4>
      </NavLink>

      <NavLink to={"/cuisine/Thai"} className={({ isActive }) => (isActive ? styles.category__nav_active : styles.category__nav)}>
        <GiNoodles />
        <h4 className={styles.nav__title}>Thai</h4>
      </NavLink>

      <NavLink to={"/cuisine/Korean"} className={({ isActive }) => (isActive ? styles.category__nav_active : styles.category__nav)}>
        <GiChopsticks />
        <h4 className={styles.nav__title}>Korean</h4>
      </NavLink>
    </div>
  );
};

export default Category;
