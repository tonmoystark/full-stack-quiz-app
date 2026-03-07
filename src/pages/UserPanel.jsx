import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();


  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    email: "guest@example.com",
    id: 1,
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch("https://quizapp-api.onrender.com/getQuestions.php");
    const result = await response.json();
    setQuestions(result);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // ডাটা মুছে ফেলা
    navigate("/"); // লগইন পেজে পাঠিয়ে দেওয়া
  };

  const calculateScore = () => {
    let currentScore = 0;
    questions.forEach((q) => {
      const selectedOptionIndex = selectedAnswers[q.id];
      const selectedOptionText = q[`option_${selectedOptionIndex}`];

      // নম্বর এবং টেক্সট উভয় ফরম্যাটে সঠিক উত্তর চেক করা
      if (
        q.right_ans == selectedOptionIndex ||
        q.right_ans === selectedOptionText
      ) {
        currentScore++;
      }
    });
    return currentScore;
  };

  const handleSubmitQuiz = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);

    // localStorage থেকে বর্তমানে লগইন থাকা ইউজারের ডাটা সংগ্রহ করা
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const quizResult = {
      user_id: loggedInUser ? loggedInUser.id : 1, // ইউজার না থাকলে ১ ডিফল্ট হিসেবে ধরবে
      score: finalScore,
      total_questions: questions.length,
      exam_date: new Date().toLocaleString(),
    };

    try {
      await fetch("http://tonmoyquiz.is-best.net/quiz_app/saveResults.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizResult),
      });
      alert(`Quiz Submitted! You scored ${finalScore}/${questions.length}`);
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20">
              Q
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter hidden sm:block">
              QUIZ<span className="text-indigo-500">APP</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white leading-none">
                {loggedInUser.name}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                {loggedInUser.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 border border-slate-700 hover:border-red-500/50 rounded-xl text-xs font-black transition-all"
            >
              LOGOUT
            </button>
            <button
              onClick={() => navigate("/userHistory")} // এই রাউটটি App.jsx এ থাকতে হবে
              className="px-4 py-2 bg-slate-800 hover:bg-indigo-500/10 hover:text-indigo-400 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs font-black transition-all"
            >
              History
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mt-5 mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Live <span className="text-indigo-500">Assessment</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Select one answer for each question.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Progress
              </p>
              <p className="text-lg font-bold text-indigo-400">
                {Object.keys(selectedAnswers).length} / {questions.length}
              </p>
            </div>
            {isSubmitted && (
              <div className="text-right border-l border-slate-700 pl-4">
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  Your Score
                </p>
                <p className="text-lg font-bold text-emerald-400">
                  {score} / {questions.length}
                </p>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-10">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-900/30 text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-800/50">
                  Question {q.id}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-6 leading-relaxed">
                {q.questions}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((num) => {
                  const isSelected = selectedAnswers[q.id] == num;
                  const optionText = q[`option_${num}`];
                  const isCorrect =
                    q.right_ans == num || q.right_ans === optionText;

                  let buttonClass =
                    "bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500/50";
                  if (isSelected)
                    buttonClass =
                      "bg-indigo-600/20 border-indigo-500 text-indigo-100";

                  if (isSubmitted) {
                    if (isCorrect)
                      buttonClass =
                        "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                    else if (isSelected && !isCorrect)
                      buttonClass = "bg-red-500/20 border-red-500 text-red-400";
                  }

                  return (
                    <button
                      key={num}
                      disabled={isSubmitted}
                      onClick={() => handleOptionSelect(q.id, num)}
                      className={`group flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${buttonClass}`}
                    >
                      <span
                        className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${isSelected ? "bg-indigo-500 border-indigo-400 text-white" : "bg-slate-900 border-slate-800 group-hover:border-indigo-500/50"}`}
                      >
                        {String.fromCharCode(64 + num)}
                      </span>
                      <span className="text-sm font-medium">
                        {q[`option_${num}`]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted && (
          <div className="flex justify-center pb-20">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
            >
              Complete Examination
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
