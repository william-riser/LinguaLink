import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ languages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedLanguages, setMatchedLanguages] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter languages based on the search term
    const matched = languages.filter((lang) =>
      lang.toLowerCase().includes(term.toLowerCase()),
    );
    setMatchedLanguages(matched);
    setDropdownVisible(true);
  };

  const handleLanguageSelection = (language) => {
    setSearchTerm(language);
    navigate(`/chatType?language=${language}`);
    setDropdownVisible(false);
    // Trigger search automatically when language is selected
    console.log("Searching for language:", language);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full py-3 px-6 rounded-full border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   text-lg font-medium shadow-md"
        placeholder="Search for a language..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {dropdownVisible && matchedLanguages.length > 0 && (
        <div
          className="absolute top-full left-0 z-10 w-full bg-white shadow-lg 
                        rounded-md border border-gray-300 overflow-hidden"
        >
          {matchedLanguages.map((language, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleLanguageSelection(language)}
            >
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
