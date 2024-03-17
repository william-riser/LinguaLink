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
      <div className="text-center lg:text-left relative z-10 mx-auto w-1/3 mt-16">
        {/* Add marginBottom to the inline style here */}
        <div style={{ textAlign: 'center', fontFamily: 'Judson, serif', color: '#504E4E', fontSize: '40px', marginBottom: '20px' }}>
          LinguaLink
        </div>
        <SearchBar languages={languages} />
      </div>
    </div>
  </div>
  
  );
  
};

export default Home;
