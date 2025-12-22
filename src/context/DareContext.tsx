import React, { createContext, useState, useContext, ReactNode } from "react";

interface DareContextType {
  customDares: string[];
  addDare: (dare: string) => void;
  removeDare: (index: number) => void;
  resetDares: () => void;
}

const DareContext = createContext<DareContextType | undefined>(undefined);

export const DareProvider = ({ children }: { children: ReactNode }) => {
  const [customDares, setCustomDares] = useState<string[]>([]);

  const addDare = (dare: string) => {
    if (dare.trim()) {
      setCustomDares((prev) => [...prev, dare.trim()]);
    }
  };

  const removeDare = (index: number) => {
    setCustomDares((prev) => prev.filter((_, i) => i !== index));
  };

  const resetDares = () => {
    setCustomDares([]);
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
