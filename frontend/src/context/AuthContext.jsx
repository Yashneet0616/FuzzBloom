import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { getProfile } from "../services/customer/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile(uid) {
    if (!uid) {
      setProfile(null);
      return null;
    }

    try {
      const latestProfile = await getProfile(uid);

      setProfile(latestProfile);

      return latestProfile;
    } catch (error) {
      console.error(error);

      setProfile(null);

      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setLoading(true);

        try {
          if (currentUser) {
            setUser(currentUser);

            await refreshProfile(currentUser.uid);
          } else {
            setUser(null);
            setProfile(null);
          }
        } catch (error) {
          console.error(error);

          setUser(null);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  async function logout() {
    await signOut(auth);

    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}