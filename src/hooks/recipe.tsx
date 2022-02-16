import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type Recepi = {
  id: string;
  name: string;
  prepare: string;
  ingredients: string;
}


type RecipesInput = Omit<Recepi, 'id'>;

type ProductsProviderProps = {
  children: ReactNode;
}

type ProductsContextData = {
  recipes: Recepi[];
  createRecipe: (data: RecipesInput) => Promise<void>;
  deleteRecipe: (id: string) => void;
  updateRecipe: (data: Recepi) => void;
}

export const RecipeContext = createContext<ProductsContextData>({} as ProductsContextData);

export function RecipesProvider({ children }: ProductsProviderProps) {
  const [recipes, setRecipes] = useState<Recepi[]>([]);
  const [editingProduct, setEditingProduct] = useState<Recepi>({} as Recepi);

  useEffect(() => {
    async function recipesList() {
      const response = await api.get('/recepis');

      // console.log(response);

      setRecipes(response.data);
    }

    recipesList();
  }, []);

  async function createRecipe(recipeInput: RecipesInput) {
    const response = await api.post('/recepis', recipeInput);

    setRecipes([
      ...recipes,
    ])
  }

  function deleteRecipe(id: string) {
    api.delete(`/recepis/${id}`);

    const newRecepiList = recipes.filter(currentRecipe => currentRecipe.id !== id);
    setRecipes(newRecepiList);
  }

  function updateRecipe(data: Recepi) {
    try {
      api.put(`/recepis/${data.id}`, data)

      console.log(data)
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
    <RecipeContext.Provider value={{ recipes, createRecipe, deleteRecipe, updateRecipe }}>
      {children}
    </RecipeContext.Provider>
  )
}