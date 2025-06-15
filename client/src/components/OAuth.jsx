import React from 'react'
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signinSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app); //this is the app that is exported from firebase.js that contains all the configs for our google oauth

          const result = await signInWithPopup(auth, provider);
          //console.log(result);
          //at this stage we have the user's data in the user (result object in the line above) object that was received in the console.log 
          //the three peices of data we need from this object are: displayName, email, and photoURL
          //these three are the ones that will be sent to the backend

          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          });

          const data = await res.json();

          dispatch(signinSuccess(data));
          navigate('/');
          
          
        } catch (error) {
          console.log('could not sign in with google', error);
        }

    }
  return (
    <div>
      <button type="button" onClick={handleGoogleClick} className="w-full border border-gray-300 p-3 rounded-md text-sm hover:bg-gray-100">
        Continue with Google
      </button>
    </div>
  )
}
