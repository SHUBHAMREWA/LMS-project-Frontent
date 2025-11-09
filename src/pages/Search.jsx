import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaSearch, FaArrowLeft } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify" ;



const Search = () => {
  const navigate = useNavigate() ;
  const [text, setText] = useState("") ;
  const [isListening, setIsListening] = useState(false) ;
  const [recomendation , setReconmentdation]  = useState("") ;
  

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
   
  const recognition = new SpeechRecognition(); 

  if(!recognition){
       toast.error("speech Recognition is not supported")      
  }

  const handleSearch = async()=>{

    if(!recognition) return  ;
    recognition.start() ;
    setIsListening(true) ;

    recognition.onresult = async (e)=>{ 
      console.log(e)
        let results =   e.results[0][0].transcript.trim() 
        setText(results)
          setIsListening(false)
    }
     
  }


  const handleRecomandation = async()=>{  
     
     tr
    
  }  



  

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#05070a] to-black text-gray-100 flex items-start justify-center">
      <div className="w-full max-w-3xl px-4 pt-24">
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-black/80 hover:text-black cursor-pointer focus:outline-none"
              aria-label="Go back"
            >
              <FaArrowLeft className="text-xl" />
            </button>

            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-black">
              <FaSearch className="text-purple-500" />
              <span>Search with</span>
              <span className="text-purple-600">AI</span>
            </div>
            <div className="w-6" />
          </div>

          {/* Input Section */}
          <form className="mt-4">
            <div className="bg-[#2f3a48] text-white rounded-full flex items-center px-4 py-2 gap-2 shadow-inner">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search courses related to your interest"
                className="flex-1 bg-transparent outline-none placeholder:text-gray-300 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="shrink-0 w-9 h-9 cursor-pointer rounded-full bg-white text-purple-600 flex items-center justify-center shadow hover:opacity-90"
                aria-label="Search"
              >
                <FaSearch />
              </button>
              <button
                type="button"
                onClick={handleSearch}
                className="shrink-0 w-9 h-9 cursor-pointer rounded-full bg-white text-purple-600 flex items-center justify-center shadow hover:opacity-90"
                aria-label="Voice search"
              >
                {isListening ? (
                  <ScaleLoader color="#d48fff" width={2} />
                ) : (
                  <FaMicrophone />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
