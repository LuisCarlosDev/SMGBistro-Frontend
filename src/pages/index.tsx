import Head from 'next/head';
import { useContext, useState } from 'react';
import { FiTrash, FiEdit3, FiPlus } from 'react-icons/fi'

import { toast } from 'react-toastify';


import { ProductsContext } from '../hooks/product';

import styles from '../styles/home.module.scss';

import { EditProductModal } from '../components/EditProductModal';
import api from '../services/api';
import { GetStaticProps } from 'next';
import { Form } from '@unform/web';


type ProductResponse = {
  id: string;
  name: string;
}

export default function Home({ products }) {
  const { setProducts } = useContext(ProductsContext);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse>({} as ProductResponse);

  function handleOpenEditProductModal(product: ProductResponse) {
    setIsEditProductModalOpen(true);
    setEditingProduct(product);

    console.log(product)
  }

  function handleCloseEditProductModal() {
    setIsEditProductModalOpen(false);
  }

  async function createProduct(data: (Omit<ProductResponse, 'id'>)): Promise<void> {
    await api.post('/products', data);
  }

  const handleCreateNewProduct = async (data: (Omit<ProductResponse, 'id'>)) => {
    createProduct(data);

    toast.success('Produto cadastrado com sucesso')

    window.location.reload();
  }

  async function deleteProduct(id: string) {
    await api.delete(`/products/${id}`);

    const newProductList = products.filter(currentProduct => currentProduct.id !== id);
    setProducts(newProductList);
    window.location.reload();
  }

  async function handleRemoveProduct(id: string) {
    deleteProduct(id);
  }

  function handleUpdateProduct(data: Omit<ProductResponse, 'id'>) {
    setProducts([
      ...products.map(product =>
        product.id === editingProduct.id ? { ...product, ...data } : product
      )
    ])

    console.log();
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Produtos</title>
      </Head>
      <header className={styles.header}>
        <h2>Meus Produtos</h2>

        <Form
          onSubmit={handleCreateNewProduct}
          className={styles['input-group']}
        >
          <input
            name='product'
            type="text"
            placeholder="Adicionar novo produto"

          />
          <button
            type="submit"
            data-testid="add-task-button"
          >
            <FiPlus size={18} color="#fff" />
          </button>
        </Form>
      </header>

      <main>
        <ul>

          {products.map(product => (
            <li key={product.id}>
              <p>{product.name}</p>
              <div>
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleOpenEditProductModal(product)}
                >
                  <FiEdit3 size={16} />
                </button>
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <FiTrash size={16} />
                </button>
              </div>

              <EditProductModal
                isOpen={isEditProductModalOpen}
                onRequestClose={handleCloseEditProductModal}
                updateProduct={handleUpdateProduct}
                editingProduct={editingProduct}
              />
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<ProductResponse>('products');

  const products = response.data;

  return {
    props: {
      products
    }
  }
}