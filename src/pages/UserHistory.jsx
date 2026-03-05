import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

useEffect(() => {

  const getHistoryData = async () => {
    if (!loggedInUser?.id) return;
    
    
    try {
      const response = await fetch(`https://tonmoyquiz.is-best.net/quiz_app/getUserHistory.php?user_id=${loggedInUser.id}`);
      const data = await response.json();
      setHistory(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoading(false);
    }
  };


  if (!loggedInUser) {
    navigate("/"); 
    return;
  }

  getHistoryData();
}, [loggedInUser, navigate]); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white">
              Exam <span className="text-indigo-500">History</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Track your performance over time
            </p>
          </div>
          <button 
            onClick={() => navigate("/userPanel")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20"
          >
            Back to Quiz
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="h-16 w-16 bg-slate-950 rounded-2xl flex items-center justify-center text-2xl border border-slate-800">
            📊
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">{loggedInUser?.name}</h2>
            <p className="text-slate-500 text-sm">{loggedInUser?.email}</p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-10 text-center text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
              Loading your records...
            </div>
          ) : history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">S.No</th>
                    <th className="px-6 py-4">Exam Date & Time</th>
                    <th className="px-6 py-4">Score Obtained</th>
                    <th className="px-6 py-4">Total Marks</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {history.map((row, index) => {
                    const percentage = (row.score / row.total_questions) * 100;
                    return (
                      <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-400">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-300">{row.exam_date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-lg font-black ${percentage >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {row.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-500">{row.total_questions}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${percentage >= 50 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {percentage >= 50 ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-slate-500 font-medium">
              You haven't attempted any exams yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;