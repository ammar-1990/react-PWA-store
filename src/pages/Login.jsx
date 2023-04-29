import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
        // ...
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setLoading(false)
      });
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col ">
      <h1 className="text-6xl capitalize cursor-pointer text-slate-900 font-sans font-semibold">
        Alpha{" "}
        <span className="p-1 bg-orange-400 inline-flex justify-center items-center rounded-md">
          store
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" w-[300px] md:w-[500px] flex flex-col gap-4 mt-12"
      >
        <input
        required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="input"
          type="text"
          placeholder="Enter your email"
        />
        <input
        required
        minLength={6}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="input"
          type="password"
          placeholder="Enter your password"
        />

        <button
          disabled={!email || !password || loading}
          className="py-2 bg-slate-900 text-orange-400 disabled:opacity-60"
        >
          {loading ? "Loading" : "Login"}
        </button>
        {error && <p className="text-red-400 text-xs py-2">{error}</p>}

        <p className="text-slate-900 mt-3">
          Don't have an account?{" "}
          <span className="hover:underline decoration-slate-900 cursor-pointer decoration-1">
            <Link to={"/register"}>register.</Link>
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
