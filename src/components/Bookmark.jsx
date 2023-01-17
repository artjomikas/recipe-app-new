import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Bookmark = (props) => {
  const { user } = UserAuth();
  const [favourite, setFavourite] = useState(null);
  const favoritesList = props.favouritesList;
  const recipeDetails = props.recipeDetails;

  const addToDb = async () => {
    console.log("Dd")
    try {
      const docRef = doc(db, "favorites", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          favouritesList: arrayUnion({
            id: recipeDetails.id,
            title: recipeDetails.title,
            image: recipeDetails.image,
          }),
        });
      } else {
        await setDoc(docRef, {
          favouritesList: arrayUnion({
            id: recipeDetails.id,
            title: recipeDetails.title,
            image: recipeDetails.image,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromDb = async (removeId) => {
    try {
      const docRef = doc(db, "favorites", user.email);
      const result = favoritesList.filter((item) => item.id != removeId);
      console.log(result)
      await updateDoc(docRef, {
        favouritesList: result,
      });
      setFavourite(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (favoritesList != undefined) {
      favoritesList.map((element) => {
        if (element.id == props.id) {
          setFavourite(true);
        }
      });
    }
  }, [favoritesList]);

  return (
    <>
      {favourite ? (
        <RiBookmarkFill
          onClick={() => {
            removeFromDb(props.id);
          }}
        />
      ) : (
        <RiBookmarkLine
          onClick={() => {
            addToDb();
          }}
        />
      )}
    </>
  );
};

export default Bookmark;
