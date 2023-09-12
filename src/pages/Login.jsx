import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: I have added this part but I can't understand how it works!
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/app");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.row}>
          <button className={styles.btn}>Login</button>
          <p className={styles.footer}>
            Want to make an account?{" "}
            <Link className={styles.link} to="../signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
