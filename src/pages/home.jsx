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
    <div>
      <SearchBar languages={languages} />
    </div>
  );
};

export default Home;
