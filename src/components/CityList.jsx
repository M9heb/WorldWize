// import React from "react";
// import PropTypes from "prop-types";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading || !cities) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
// CityList.propTypes = {
//   cities: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       cityName: PropTypes.string.isRequired,
//       country: PropTypes.string.isRequired,
//       emoji: PropTypes.any,
//       date: PropTypes.string,
//       notes: PropTypes.string,

//       position: PropTypes.object.isRequired,
//       // Add more PropTypes for other properties of your city object
//     })
//   ),
//   isLoading: PropTypes.bool.isRequired,
// };
