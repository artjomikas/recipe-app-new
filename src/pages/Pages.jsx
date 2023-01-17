import { Route, Routes, useLocation } from "react-router-dom";
import { Login, Signup, Cuisine, Searched, Recipe, Header, Category, Home, Favourites, ResetPassword } from "../index";

const Pages = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname != "/login" && location.pathname != "/signup" && location.pathname != "/reset-password" && (
        <>
          <Header />
          {location.pathname != "/favourites" && <Category />}
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
};

export default Pages;
