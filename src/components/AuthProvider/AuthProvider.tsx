import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  User,
  UserCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  sendEmailVerification,
} from "firebase/auth";

interface AuthState {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  sendVerificationEmail: (user: User) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserData: (user: User, name: string) => Promise<void>;
  removeUser: (user: User) => Promise<void>;
  isFetching: boolean;
}

function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function sendVerificationEmail(user: User) {
  return sendEmailVerification(user);
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

function loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  return signInWithRedirect(auth, provider);
}

function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
}

function logout() {
  return signOut(auth);
}

function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

function updateUserData(user: User, name: string) {
  return updateProfile(user, { displayName: name });
}

function removeUser(user: User) {
  return deleteUser(user);
}

const AuthContext = createContext<AuthState>({
  currentUser: null,
  signup,
  sendVerificationEmail,
  login,
  loginWithGoogle,
  loginWithFacebook,
  logout,
  resetPassword,
  updateUserData,
  removeUser,
  isFetching: true,
});

function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsFetching(false);
      } else {
        setCurrentUser(null);
        setIsFetching(false);
      }
    });

    return unsubscribe;
  }, []);

  const context: AuthState = {
    currentUser,
    signup,
    sendVerificationEmail,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    resetPassword,
    updateUserData,
    removeUser,
    isFetching,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;
