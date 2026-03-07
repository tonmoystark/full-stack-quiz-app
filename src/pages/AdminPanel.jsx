import React, { useState } from "react";
import GetQuestions from "../components/GetQuestions";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    right_ans: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://quizapp-api.onrender.com/createQuestion.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (result.status === "success") {
      setFormData({
        question: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        right_ans: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Responsive Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-400 tracking-tight">
          Quiz Admin{" "}
          <span className="text-slate-500 font-light hidden sm:inline">
            | Control Panel
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-medium text-slate-400">
            Welcome, Admin
          </span>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-indigo-900 rounded-full flex items-center justify-center text-indigo-400 font-bold border border-indigo-700">
            A
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 border border-slate-700 hover:border-red-500/50 rounded-xl text-xs font-black transition-all"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main Responsive Grid */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Form Section - Full width on mobile, sticky sidebar on desktop */}
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-28 order-2 lg:order-1">
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-6 text-slate-100 border-b border-slate-800 pb-4">
              Create New Question
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">
                  Question Text
                </label>
                <textarea
                  rows="3"
                  required
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="What is the capital of..."
                  className="w-full border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-950 text-slate-200 placeholder:text-slate-600"
                />
              </div>

              {/* Responsive Options Grid (1 col on tiny mobile, 2 on others) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
                      Option {num}
                    </label>
                    <input
                    required
                      type="text"
                      name={`option_${num}`}
                      value={formData[`option_${num}`]}
                      onChange={handleChange}
                      placeholder={`Choice ${num}`}
                      className="w-full border border-slate-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-950 text-slate-200"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
                  Correct Answer Index
                </label>
                <select
                required
                  name="right_ans"
                  value={formData.right_ans}
                  onChange={handleChange}
                  className="w-full border border-slate-800 rounded-lg px-3 py-2 bg-slate-950 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">
                    Select Index (1-4)
                  </option>
                  <option value={formData.option_1} className="bg-slate-900">
                    Option 1
                  </option>
                  <option value={formData.option_2} className="bg-slate-900">
                    Option 2
                  </option>
                  <option value={formData.option_3} className="bg-slate-900">
                    Option 3
                  </option>
                  <option value={formData.option_4} className="bg-slate-900">
                    Option 4
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
              >
                Add to Database
              </button>
            </form>
          </div>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <GetQuestions handleSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
