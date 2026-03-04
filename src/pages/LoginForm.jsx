import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  const [isPassRight, setIsPassRight] = useState(true);
  const [isUserAvailable, setIsUserAvailable] = useState(true);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsPassRight(true);
    setIsUserAvailable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "admin@quiz.com" && formData.password === "admin") {
      localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
      navigate("/adminPanel"); 
      return; 
    }
    
    try {
      const response = await fetch("http://quiz_app.test/getUsers.php");
      const result = await response.json();


      const user = result.find((u) => u.email === formData.email);
      
      if (user) {
        setIsUserAvailable(true);

        if (user.password === formData.password) {
          setIsPassRight(true);
          
          
          localStorage.setItem("user", JSON.stringify(user)); 

          console.log("Login successful");
          
         
          navigate("/userPanel"); 
          
        } else {
          setIsPassRight(false);
        }
      } else {
        setIsUserAvailable(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            QUIZ <span className="text-indigo-500">APP</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Welcome back! Please enter your details
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-500/5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="name@example.com"
                className={`w-full bg-slate-950 border ${!isUserAvailable ? 'border-red-500' : 'border-slate-800'} rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                required
              />
              {!isUserAvailable && (
                <p className="text-[10px] text-red-500 font-bold uppercase mt-2 ml-1 tracking-wider">
                  No account found with this email
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <span className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer uppercase tracking-tighter">
                  Forgot Password?
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="••••••••"
                className={`w-full bg-slate-950 border ${!isPassRight ? 'border-red-500' : 'border-slate-800'} rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                required
              />
              {!isPassRight && (
                <p className="text-[10px] text-red-500 font-bold uppercase mt-2 ml-1 tracking-wider">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/registration">
                <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-semibold">
                  Create one
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;