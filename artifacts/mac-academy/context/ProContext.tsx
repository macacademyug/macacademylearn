import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Add or remove valid Pro codes here
const PRO_CODES = [
  "MAC-PRO-2024",
  "FLIPACLIPMAC",
  "TOONZUG-PRO",
  "MACADEMY2025",
  "MACPRO001",
];

interface ProContextType {
  isPro: boolean;
  unlockPro: (code: string) => boolean;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

const PRO_KEY = "@mac_academy_pro";

export function ProProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(PRO_KEY);
        if (saved === "true") setIsPro(true);
      } catch {}
    })();
  }, []);

  const unlockPro = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase().replace(/-/g, "-");
    const valid = PRO_CODES.some((c) => c.toUpperCase() === trimmed);
    if (valid) {
      setIsPro(true);
      AsyncStorage.setItem(PRO_KEY, "true").catch(() => {});
    }
    return valid;
  };

  return (
    <ProContext.Provider value={{ isPro, unlockPro }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used within ProProvider");
  return ctx;
}
