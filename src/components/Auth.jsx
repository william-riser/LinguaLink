import {auth, provider} from "";
import {signInWithPopup} from 'firebase/auth'

export const Auth = () => {

    const signInWithGoogle = async () =>{
        await signInWithPopup(auth, provider);
    }

    return <div className = "auth">
        <p>Sign In With Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
}

export default Auth;