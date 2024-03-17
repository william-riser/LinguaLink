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
      <div className="h-screen flex flex-col">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url(/BabelBrellaBackground.png)" }}></div>
        <div className="text-center lg:text-left relative z-10 mx-auto w-1/3 mt-20"> {/* Adjusted classes for direct content styling */}
          {/* ?<div className="text-4xl font-bold mb-8" style={{ fontFamily: 'Judson, serif', color: '#504E4E' }}>BabelBrella</div> */}
          <div className="text-4xl mb-6" style={{ fontFamily: 'Judson, serif', color: '#504E4E' }}>Language Learning Made Easy</div>
          <SearchBar languages={languages} />
        </div>
      </div>
    </div>
  );
  
};

export default Home;
