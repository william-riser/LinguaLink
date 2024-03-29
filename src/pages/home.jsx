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
      {/* Top Banner */}
      <div style={{
        textAlign: 'center',
        padding: '15px', // Adjust padding as needed
        backgroundColor: '#ffffff', // Choose a background color that fits your design
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
        fontSize: '24px', // Adjust font size as needed
        fontFamily: 'Judson, serif',
        fontWeight: 'bold',
        color: '#504E4E',
        position: 'relative', // Position relative or another positioning except 'static'
        zIndex: 10 // Ensure this is greater than the background's z-index
      }}>
        LinguaLink
      </div>
      
      <div className="h-screen flex flex-col">
      <div className="absolute inset-0 z-0 bg-cover bg-center" 
     style={{ 
       backgroundImage: "url('/BabelBrellaBackground2.svg')", 
       backgroundSize: 'cover', 
       backgroundRepeat: 'no-repeat', 
       backgroundPosition: 'center'
     }}>
</div>

        <div className="text-center lg:text-left relative z-10 mx-auto w-1/3 mt-8">
          <div style={{ 
            textAlign: 'center', 
            fontFamily: 'Judson, serif', 
            color: '#504E4E', 
            fontSize: '35px', 
            fontWeight: 'bold',
            marginBottom: '20px' 
            }}>
            Language Learning Made Easy
          </div>
          <SearchBar languages={languages} />
        </div>
      </div>
    </div>
  );
  
};

export default Home;
