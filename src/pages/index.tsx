import Head from 'next/head';
import { FormEvent, useContext, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiTrash, FiEdit3, FiPlus } from 'react-icons/fi'

import { ProductsContext } from '../hooks/product';

import styles from '../styles/home.module.scss';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { EditProductModal } from '../components/EditProductModal';
import api from '../services/api';


type ProductResponse = {
  id: string;
  name: string;
}

// type ProductInput = Omit<ProductResponse, 'id'>

export default function Home() {
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const { products, createProduct, deleteProduct } = useContext(ProductsContext);

  const handleCreateNewProduct: SubmitHandler<ProductResponse> = async (name) => {
    createProduct(name);
  }


  async function handleRemoveProduct(id: string) {
    deleteProduct(id);
  }

  function handleOpenEditProductModal() {
    setIsEditProductModalOpen(true);
  }

  function handleCloseEditProductModal() {
    setIsEditProductModalOpen(false);
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Produtos</title>
      </Head>
      <header className={styles.header}>
        <h2>Meus Produtos</h2>

        <form
          onSubmit={handleSubmit(handleCreateNewProduct)}
          className={styles['input-group']}
        >
          <input
            name='product'
            type="text"
            placeholder="Adicionar novo produto"
            {...register('name')}
          />
          <button
            type="submit"
            data-testid="add-task-button"
          >
            <FiPlus size={18} color="#fff" />
          </button>
        </form>
      </header>

      <main>
        <ul>

          {products.map(product => (
            <li key={product.id}>
              <p>{product.name}</p>
              <div>
                <button type="button" data-testid="remove-task-button" onClick={handleOpenEditProductModal}>
                  <FiEdit3 size={16} />
                </button>
                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveProduct(product.id)}>
                  <FiTrash size={16} />
                </button>
              </div>

              <EditProductModal
                isOpen={isEditProductModalOpen}
                onRequestClose={handleCloseEditProductModal}
              />
            </li>
          ))}

        </ul>
      </main>
    </section>

  )
}
