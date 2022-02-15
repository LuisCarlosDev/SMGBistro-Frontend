import { ReactNode } from "react";
import { ProductsProvider } from "./product";

interface AppProviderProps {
  children: ReactNode;
}
export function AppProvider({ children }: AppProviderProps) {
  return (
    <ProductsProvider>
      {children}
    </ProductsProvider>
  )
}