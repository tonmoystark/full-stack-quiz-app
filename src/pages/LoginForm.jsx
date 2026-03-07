import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin Bypass
    if (formData.email === "admin@quiz.com" && formData.password === "admin") {
      localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
      navigate("/adminPanel");
      return;
    }

    try {
      const response = await fetch("https://quizapp-api-c8yt.onrender.com/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Login successful");
        navigate("/userPanel");
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("InfinityFree security or network error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-white text-center mb-6">
          QUIZ <span className="text-indigo-500">APP</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={changeHandler}
            required
          />
          
          {errorMsg && <p className="text-red-500 text-xs font-bold text-center">{errorMsg}</p>}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all">
            Log In
          </button>
        </form>
        
        <p className="mt-6 text-center text-slate-500 text-sm">
          New here? <Link to="/registration" className="text-indigo-400">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;