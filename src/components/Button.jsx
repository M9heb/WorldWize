import styles from "./Button.module.css";
import PropTypes from "prop-types";
export default function Button({ children, onClick, type }) {
  return (
    <div>
      <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
