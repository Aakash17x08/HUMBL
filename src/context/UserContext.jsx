import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          console.log('📦 User Data from Firestore:', data);
        }
        
        const token = await firebaseUser.getIdToken();
        console.log('🔑 Firebase Auth Token:', token);
      } else {
        setUserData(null);
        console.log('👤 User signed out');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateCalories = (data) => {
    if (!data.weight || !data.heightFeet || !data.age || !data.gender) return 0;

    // Convert height to cm
    const heightCm = (parseInt(data.heightFeet) * 30.48) + (parseInt(data.heightInches || 0) * 2.54);
    const weightKg = parseFloat(data.weight);
    const age = parseInt(data.age);

    // Mifflin-St Jeor Equation
    let bmr;
    if (data.gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Activity Multipliers
    const multipliers = {
      bmr: 1,
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
      'extra-active': 2.0
    };

    const multiplier = multipliers[data.activityLevel] || 1.2;
    const tdee = bmr * multiplier;

    // Adjust based on goal
    let targetCalories = tdee;
    if (data.goals?.includes('Lose weight')) targetCalories -= 500;
    if (data.goals?.includes('Gain weight') || data.goals?.includes('Gain muscle')) targetCalories += 500;

    const roundedCalories = Math.round(targetCalories);
    console.log('🔥 Calculated Daily Calories:', roundedCalories, 'based on:', data);
    return roundedCalories;
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const updateProfile = async (newData) => {
    if (!user) return;
    try {
      const calories = calculateCalories({ ...userData, ...newData });
      const updatedData = { ...newData, calories };
      await updateDoc(doc(db, 'users', user.uid), updatedData);
      setUserData(prev => ({ ...prev, ...updatedData }));
      return { success: true };
    } catch (error) {
      console.error("Error updating profile: ", error);
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider value={{ user, userData, loading, logout, calculateCalories, setUserData, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
