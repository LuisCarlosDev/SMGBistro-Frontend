import { ReactNode } from "react";

import { ProductsProvider } from "./product";
import { RecipesProvider } from "./recipe";

interface AppProviderProps {
  children: ReactNode;
}
export function AppProvider({ children }: AppProviderProps) {
  return (
    <ProductsProvider>
      <RecipesProvider>
        {children}
      </RecipesProvider>
    </ProductsProvider>
  )
}