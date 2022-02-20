import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type ProductResponse = {
  id: string;
  name: string;
}

type ProductInput = Omit<ProductResponse, 'id'>;

type ProductsProviderProps = {
  children: ReactNode;
}

type ProductsContextData = {
  products: ProductResponse[];
  setProducts: (newState: ProductResponse[]) => void;
  createProduct: (data: ProductInput) => void;
  deleteProduct: (id: string) => void;
  updateProduct(data: Omit<ProductResponse, 'id'>): void;
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  

  useEffect(() => {
    async function productList() {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    productList();
  }, []);

  async function createProduct(dataInput: ProductInput): Promise<void> {
    await api.post('/products', dataInput);
  }

  function deleteProduct(id: string) {
    api.delete(`/products/${id}`);

    const newProductList = products.filter(currentProduct => currentProduct.id !== id);
    setProducts(newProductList);
  }

  async function updateProduct(data: Omit<ProductResponse, 'id'>) {
    await api.put(`/products/${data}`)
  }

  return (
    <ProductsContext.Provider value={{
      products,
      setProducts,
      createProduct,
      deleteProduct,
      updateProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}