import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export { AuthContext };

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check if Firebase auth is properly initialized
  const isAuthInitialized = auth && typeof auth.currentUser !== 'undefined';

  // Google Auth Provider
  let googleProvider;
  if (isAuthInitialized) {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  }

  function signup(email, password, displayName) {
    if (!isAuthInitialized) {
      throw new Error('Firebase authentication is not properly configured. Please check your .env file.');
    }
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update the user's display name
        return updateProfile(result.user, {
          displayName: displayName
        });
      });
  }

  function login(email, password) {
    if (!isAuthInitialized) {
      throw new Error('Firebase authentication is not properly configured. Please check your .env file.');
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    if (!isAuthInitialized || !googleProvider) {
      throw new Error('Firebase authentication is not properly configured. Please check your .env file.');
    }
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    if (!isAuthInitialized) {
      throw new Error('Firebase authentication is not properly configured. Please check your .env file.');
    }
    return signOut(auth);
  }

  useEffect(() => {
    if (!isAuthInitialized) {
      setAuthError('Firebase authentication is not properly configured. Please check your .env file.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      setAuthError(null);
    });

    return unsubscribe;
  }, [isAuthInitialized]);

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,
    logout,
    authError,
    isAuthInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 