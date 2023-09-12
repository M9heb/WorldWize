import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";

export default function Signup() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    // const username = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        alert(
          "Congrats! You have successfully created an account. Now let's log in"
        );
        // const user = userCredential.user;
        // console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(
          "The operation failed! :( please make sure that your inputs are correct and then try again"
        );
        // ..
      });
    // createUserWithEmailAndPassword(auth, email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Username</label>
          <input type="text" id="name" placeholder="John Smith" />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required={true}
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="confirm_password"
            required={true}
            id="confirm_password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Confirm your password</label>
          <input
            type="password"
            required={true}
            id="password"
            value={password}
          />
        </div>

        <div className={styles.row}>
          <button type="submit" className={styles.btn}>
            Sign up
          </button>
          <p className={styles.footer}>
            Already have account?{" "}
            <Link className={styles.link} to="../login">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
