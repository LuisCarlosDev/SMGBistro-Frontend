import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type ProductResponse = {
  id: string;
  name: string;
}

type ProductsProviderProps = {
  children: ReactNode;
}

type ProductsContextData = {
  products: ProductResponse[];
  createProduct: (name: string) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: ProductResponse) => void;
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductResponse>({} as ProductResponse);

  useEffect(() => {
    async function productList() {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    productList();
  }, []);

  function createProduct(name: string) {
    api.post('/products', {
      name
    });
  }

  function deleteProduct(id: string) {
    api.delete(`/products/${id}`);

    const newProductList = products.filter(currentProduct => currentProduct.id !== id);
    setProducts(newProductList);
  }

  function updateProduct(product: ProductResponse) {
    try {
      api.put(`/products/${product.id}`, product)

      console.log(product)
    } catch (error) {
      console.log(error)
    }

    /* setProducts([
      ...products.map(item =>
        item.id === editingProduct.id ? { ...item, ...product } : item,
      ),
    ]); */
  }

  return (
    <ProductsContext.Provider value={{ products, createProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}