import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserAuth } from "../context/AuthContext";

const AddingToDatabase = (recipe_details_id) => {
  const { user } = UserAuth();



  return (
    <div>
      <button onClick={addToDb}>TEEEST</button>
    </div>
  );
};

export default AddingToDatabase;
