import { auth } from "../../firebase-config.ts";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };
  return (
    <div className="App"> 
      <div className="absolute inset-0 z-0 bg-cover bg-center flex flex-col items-center pt-40 h-screen" style={{ backgroundImage: "url(/loginPage.png)" }}>
        <div className="app-header text-center">
          <h1 className="text-4xl p-2 font-bold" style={{ fontFamily: "Judson, serif" }}>Welcome to LinguaLink</h1>
          <p className="text-gray-600 text-lg w-3/5 text-center mx-auto" style={{ fontFamily: "Judson, serif" }}>Dive into language learning with interactive conversations in our captivating app experience.</p>
        </div>
        <div className="app-container">{children}</div>
        {isAuth && (
          <div className="sign-out">
            <button onClick={signUserOut}> Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};
