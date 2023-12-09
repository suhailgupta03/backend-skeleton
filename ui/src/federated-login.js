// Step 1: Import React and Firebase modules
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Step 2: Initialize Firebase
const firebaseConfig = {
    apiKey: "xx",
    authDomain: "xx",
    projectId: "federated-login-testing",
    storageBucket: "xx",
    messagingSenderId: "xx",
    appId: "xx",
    measurementId: "G-xx"
};

initializeApp(firebaseConfig);
const auth = getAuth();

// Step 3: Create a React component for federated login with token and identity explanation
const FederatedLogin = () => {
  const [authToken, setAuthToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  // Event handler for Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The above function returns a user credential object
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth#.UserCredential

      // Set user details and token on successful login
      setUserDetails(result.user);
      setAuthToken(result.user.accessToken);
      setError('');
    } catch (err) {
      // Set error message on failure
      setUserDetails(null);
      setAuthToken('');
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Federated Login Demo</h2>
      <p>Click the button below to sign in with Google:</p>
      <button onClick={handleGoogleLogin} style={{
        color: "blue",
        border: "1px solid blue",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "15px",
        margin: "5px",
        fontSize: "16px",
        pointer: "cursor"
      }}>
        Sign in with Google
      </button>
      {/* Display authentication token and user details */}
      {authToken && (
        <div>
          <h3>Authentication Token:</h3>
          <p>This is the token you can use to authenticate API requests or manage sessions.</p>
          <textarea readOnly value={authToken} rows="4" cols="50"></textarea>
        </div>
      )}
      {userDetails && (
        <div>
          <h3>User Identity:</h3>
          <p>Name: {userDetails.displayName}</p>
          <p>Email: {userDetails.email}</p>
          <img src={userDetails.photoURL} alt="User profile" />
        </div>
      )}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FederatedLogin;
