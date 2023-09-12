// import React from "react";
// import PropTypes from "prop-types";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../Contexts/CitiesContext";
export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
// CountryList.propTypes = {
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
