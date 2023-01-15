import Recipes from "../components/Recipes/Recipes";

const Home = () => {
  return (
    <>
      <Recipes type="popular" elementsInSlider="4" title="Popular Picks" />
      <Recipes type="veggie" elementsInSlider="3" title="Our Vegetarian Picks" tag="vegetarian" />
    </>
  );
};

export default Home;
