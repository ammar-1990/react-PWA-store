import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {

        updateProfile(userCredential.user,{
         displayName:form.username,
      
     
        });
      
     return userCredential.user  } ).then((user)=>{
       
        navigate('/',{replace:true})})
    } catch (error) {
      setError(error.message);
    } finally {
      setForm({
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
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
          value={form.username}
          onChange={(e) => {
            setForm((form) => ({ ...form, username: e.target.value }));
            setError("");
          }}
          className="input"
          type="text"
          placeholder="Enter your name"
        />
        <input
          required
          value={form.email}
          onChange={(e) => {
            setForm((form) => ({ ...form, email: e.target.value }));
            setError("");
          }}
          className="input"
          type="email"
          placeholder="Enter your email"
        />
        <input
          required
          minLength={6}
          value={form.password}
          onChange={(e) => {
            setForm((form) => ({ ...form, password: e.target.value }));
            setError("");
          }}
          className="input"
          type="password"
          placeholder="Enter your password"
        />

        <button
          disabled={!form.username || !form.email || !form.password || loading}
          className="py-2 bg-slate-900 text-orange-400 disabled:opacity-60"
        >
          {loading ? "Loading" : "Register"}
        </button>
        {error && <p className="text-xs text-red-400 py-2">{error}</p>}

        <p className="text-slate-900 mt-3">
          Back to{" "}
          <span className="hover:underline decoration-slate-900 cursor-pointer decoration-1">
            <Link to={"/login"}>login.</Link>
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
