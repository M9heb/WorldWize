import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

const CitiesContext = createContext();
// const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    // case "city/created":
    //   return {
    //     ...state,
    //     cities: [...state.cities, action.payload],
    //     currentCity: action.payload,
    //     isLoading: false,
    //   };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { currentUser } = useContext(AuthContext);
  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const citiesCollection = collection(db, "cities");
      const data = await getDocs(citiesCollection, currentUser.uid);
      if (data.empty) {
        // If the collection is empty, initialize it with an empty array
        await setDoc(doc(db, "cities", currentUser.uid), { cities: [] });
        dispatch({ type: "cities/loaded", payload: [] });
      } else {
        const citiesData = data.docs.map((doc) => doc.data());
        // console.log("Cities from context", citiesData[0].cities);
        dispatch({ type: "cities/loaded", payload: citiesData[0].cities });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  useEffect(
    function () {
      fetchCities();
    },
    [currentUser]
  );

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const cityData = cities.filter((city) => city.id === id);
        // const res = await fetch(`${BASE_URL}/cities/${id}`);
        // const data = await res.json();
        dispatch({ type: "city/loaded", payload: cityData });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    },
    [currentCity, cities]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      //   const res = await fetch(`${BASE_URL}/cities`, {
      //     method: "POST",
      //     body: JSON.stringify(newCity),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      const city = doc(db, "cities", currentUser?.uid);

      await updateDoc(city, { cities: arrayUnion(newCity) });
      // const data = await res.json();
      // dispatch({ type: "city/created", payload: city });
      fetchCities();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error sending data...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // Create a new array without the city to be deleted
      const updatedCities = cities.filter((city) => city.id !== id);

      // Update the Firestore document with the modified array
      const cityRef = doc(db, "cities", currentUser?.uid);
      await updateDoc(cityRef, { cities: updatedCities });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used in the wrong place.");
  return context;
}
CitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export { CitiesProvider, useCities };
