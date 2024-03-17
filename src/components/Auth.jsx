// // import {auth, provider} from "";
// import {signInWithPopup} from 'firebase/auth'

// export const Auth = () => {

//     const signInWithGoogle = async () =>{
//         await signInWithPopup(auth, provider);
//     }

//     return <div className = "auth">
//         <p>Sign In With Google to Continue</p>
//         <button onClick={signInWithGoogle}>Sign In With Google</button>
//         </div>
// }

// export default Auth;

import { auth, provider } from "../../firebase-config.ts";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button className="bg-green-200 rounded-md p-2 m-4" onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};
