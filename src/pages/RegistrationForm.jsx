import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for validation messages
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple Regex: min 8 chars, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters with 1 letter and 1 number.",
      );
      return;
    }

    const response = await fetch("https://tonmoyquiz.is-best.net/quiz_app/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (result.status === "success") {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setError(""); // Clear any previous errors
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            QUIZ <span className="text-indigo-500">APP</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Create your account to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-500/5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                name="name"
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                Security Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="••••••••"
                className={`w-full bg-slate-950 border ${error ? "border-red-500" : "border-slate-800"} rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
              />
              {error && (
                <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold uppercase tracking-tight">
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              name="submit"
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to={"/"}>
              
                <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-semibold">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
