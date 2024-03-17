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
      <div className="absolute inset-0 z-0 bg-cover bg-center flex flex-col items-center pt-36 h-screen" style={{ backgroundImage: "url(/loginPage.png)" }}>
        <div className="app-header text-center">
          <h1 className="text-6xl p-2 font-bold pb-8" style={{ fontFamily: "Judson, serif" }}>Welcome to LinguaLink</h1>
          <p className="text-gray-500 text-xl w-4/6 text-center mx-auto font-bold pb-6" style={{ fontFamily: "Judson, serif" }}>Engage in immersive conversations with others around the globe to practice language skills</p>
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
