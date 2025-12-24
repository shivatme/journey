import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DareContextType {
  customDares: string[];
  addDare: (dare: string) => void;
  removeDare: (index: number) => void;
  resetDares: () => void;
}

const DareContext = createContext<DareContextType | undefined>(undefined);

export const DareProvider = ({ children }: { children: ReactNode }) => {
  const [customDares, setCustomDares] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load dares from storage on mount
  useEffect(() => {
    const loadDares = async () => {
      try {
        const storedDares = await AsyncStorage.getItem("customDares");
        if (storedDares) {
          setCustomDares(JSON.parse(storedDares));
        }
      } catch (error) {
        console.error("Failed to load dares:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDares();
  }, []);

  // Helper to save dares
  const saveDares = async (dares: string[]) => {
    try {
      await AsyncStorage.setItem("customDares", JSON.stringify(dares));
    } catch (error) {
      console.error("Failed to save dares:", error);
    }
  };

  const addDare = (dare: string) => {
    if (dare.trim()) {
      const newDares = [...customDares, dare.trim()];
      setCustomDares(newDares);
      saveDares(newDares);
    }
  };

  const removeDare = (index: number) => {
    const newDares = customDares.filter((_, i) => i !== index);
    setCustomDares(newDares);
    saveDares(newDares);
  };

  const resetDares = () => {
    setCustomDares([]);
    saveDares([]);
  };

  return (
    <DareContext.Provider
      value={{ customDares, addDare, removeDare, resetDares }}
    >
      {children}
    </DareContext.Provider>
  );
};

export const useDares = () => {
  const context = useContext(DareContext);
  if (!context) {
    throw new Error("useDares must be used within a DareProvider");
  }
  return context;
};
