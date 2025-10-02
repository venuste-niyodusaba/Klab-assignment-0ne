import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CompareContextType {
  compare: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compare, setCompare] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    setCompare((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev; // prevent duplicates
      return [...prev, product];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompare((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CompareContext.Provider value={{ compare, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
