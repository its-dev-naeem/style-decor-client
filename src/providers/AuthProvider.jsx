import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = async (email, password, photoURL, displayName) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName, photoURL });
    } finally {
      setLoading(false);
    }
  };

  // Update profile.
  const updateNamePhoto = async (editedUser) => {
    setLoading(true);
    try {
     const result = await updateProfile(auth.currentUser, editedUser);
     return result;
    } finally {
      setLoading(false);
    }
  };

  // login user
  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // forgot password email
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const result = await sendPasswordResetEmail(auth, email);
      return result;
    } finally {
      setLoading(false);
    }
  };
  // login with google
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      return result; 
    } finally {
      setLoading(false);
    }
  };

  // logout user
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };
  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        updateNamePhoto,
        userLogin,
        forgotPassword,
        googleSignIn,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
