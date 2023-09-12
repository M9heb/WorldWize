import { useContext } from "react";
import styles from "./User.module.css";
import { AuthContext } from "../Contexts/AuthContext";

function User() {
  const { SignOut } = useContext(AuthContext);

  return (
    <div className={styles.user}>
      <span>Welcome 😊</span>
      <button onClick={SignOut}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
