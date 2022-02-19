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
  // product: ProductResponse;
  createProduct: (data: ProductInput) => void;
  deleteProduct: (id: string) => void;
  updateProduct(product: ProductResponse): void;
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [product, setProduct] = useState<ProductResponse>({} as ProductResponse);

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

  async function updateProduct(data: ProductResponse) {
    console.log(data);
  }

  return (
    <ProductsContext.Provider value={{
      products,
      createProduct,
      deleteProduct,
      updateProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}