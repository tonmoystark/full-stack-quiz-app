import React, { useEffect, useState } from 'react'

const GetQuestions = ({handleSubmit}) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [handleSubmit])

    const fetchQuestions = async () => {
        const response = await fetch("tonmoyquiz.is-best.net/quiz_app/getQuestions.php");
        const result = await response.json();
        setQuestions(result);
    }

  return (
    <div className='w-full'>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className='text-xl md:text-2xl font-bold text-slate-100'>Question Bank</h2>
            <span className="bg-indigo-900/50 text-indigo-400 border border-indigo-800 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {questions.length} Total Questions
            </span>
        </div>
        
        {/* BEAUTIFUL SCROLLBAR CONTAINER */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 h-auto lg:h-[calc(100vh-220px)] overflow-y-auto pr-2 
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-slate-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/50
            transition-all'>
            
            {questions.map((question, idx) => (
            <div className='bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg hover:border-indigo-500/30 transition-all flex flex-col justify-between group' key={idx}>
                <div>
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">ID #{question.id}</span>
                        <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button title="Edit" name='edit' className='p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-950 rounded-lg transition-colors'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button title="Delete" name='delete' className='p-2 text-slate-500 hover:text-red-400 hover:bg-red-950 rounded-lg transition-colors'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    </div>
                    <h1 className='text-base md:text-lg font-bold text-slate-100 leading-tight mb-4'>{question.questions}</h1>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'>
                        {[1,2,3,4].map(opt => (
                            <div key={opt} className={`px-3 py-2 rounded-lg text-xs border transition-colors : 'bg-slate-950 border-slate-800 text-slate-500`}>
                                <span className="opacity-50 mr-1">{opt}.</span> {question[`option_${opt}`]}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='pt-3 border-t border-slate-800 flex items-center justify-between'>
                    <p className='text-[10px] font-bold uppercase text-slate-600'>Correct Answer</p>
                    <div className='flex items-center gap-2'>
                      <div className='h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'></div>
                      <span className='text-xs font-black text-emerald-500 uppercase'>{question.right_ans}</span>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default GetQuestions;