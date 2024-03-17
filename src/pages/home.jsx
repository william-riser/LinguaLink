import React from "react";
import SearchBar from "../components/searchBar";

const Home = () => {
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Italian",
    "Portuguese",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Finnish",
    "Greek",
    "Turkish",
    "Hindi",
    "Bengali",
    "Punjabi",
    "Urdu",
    "Thai",
    "Vietnamese",
    "Indonesian",
    "Malay",
    "Tagalog",
    "Polish",
    "Romanian",
    "Czech",
    "Hungarian",
    "Slovak",
    "Bulgarian",
    "Ukrainian",
    "Croatian",
    "Serbian",
    "Slovenian",
    "Estonian",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Farsi (Persian)",
    "Hebrew",
    "Swahili",
    "Afrikaans",
    "Zulu",
    "Xhosa",
    "Kinyarwanda",
  ];
  return (
<div className="overflow-hidden">
      <div className="h-screen flex flex-col">  {/* Changed to flex-col */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url(/BabelBrellaBackground.png)" }}></div>
        <div className="relative z-10 container mx-auto w-1/3 bg-gray-100 rounded-lg p-8 mb-10 flex flex-col justify-center mt-20 shadow-2xl"> 
          <div className="text-center lg:text-left">
            <div className="text-4xl font-bold text-gray-800 mb-8">BabelBrella</div>
            <div className="text-xl text-gray-800 mb-10">Language Learning Made Easy</div>
            <SearchBar languages={languages} />
          </div>
          <div className="flex-grow-2 bg-gray-100"> {/* Added empty div */} </div> 
      </div>
    </div>

</div>
  );
};

export default Home;
