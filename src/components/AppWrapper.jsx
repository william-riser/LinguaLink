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
    <div className="App flex flex-col items-center justify-center h-screen bg-blue-500"> 
      <div className="app-heade">
        <h1 className="text-4xl p-2">BableBrella</h1>
        <p>Welcome to our website!</p>
      </div>
      <div className="app-container">{children}
      </div>
            {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
