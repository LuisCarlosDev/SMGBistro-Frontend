import Head from 'next/head';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FiTrash, FiX, FiEdit3, FiPlus } from 'react-icons/fi'

import { ProductsContext } from '../hooks/product';

import styles from '../styles/home.module.scss';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


type ProductResponse = {
  id: string;
  name: string;
}

export default function Home() {
  const formRef = useRef<FormHandles>(null);
  const [isEditProductModal, setIsEditProductModal] = useState(false);
  const [titleProduct, setTitleProduct] = useState('');

  const { products, createProduct, deleteProduct, updateProduct } = useContext(ProductsContext);

  async function handleCreateNewProduct(event: FormEvent) {
    event.preventDefault();

    createProduct(titleProduct);

    setTitleProduct('');
  }

  // FALTA FAZER
  async function handleEditProduct(product: ProductResponse): Promise<void> {
    updateProduct(product);
  }

  async function handleRemoveProduct(id: string) {
    deleteProduct(id);
  }

  function handleOpenEditProductModal() {
    setIsEditProductModal(true);
  }

  function handleCloseEditProductModal() {
    setIsEditProductModal(false);
  }



  return (
    <section className={styles.container}>
      <Head>
        <title>Produtos</title>
      </Head>
      <header className={styles.header}>
        <h2>Meus Produtos</h2>

        <form
          onSubmit={handleCreateNewProduct}
          className={styles['input-group']}
        >
          <input
            type="text"
            placeholder="Adicionar novo produto"
            value={titleProduct}
            onChange={event => setTitleProduct(event.target.value)}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={() => handleCreateNewProduct}
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
              <Modal
                isOpen={isEditProductModal}
                onRequestClose={handleCloseEditProductModal}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
              >
                <button
                  onClick={handleCloseEditProductModal}
                  className="react-modal-close"
                >
                  <FiX size={18} color='#3D3D4D' />
                </button>
                <Form
                  ref={formRef}
                  onSubmit={handleEditProduct}
                  className={styles.formModal}
                >
                  <h2>Editar produto</h2>
                  <input
                    value={titleProduct}
                    placeholder='Novo nome'
                    onChange={e => setTitleProduct(e.target.value)}
                  />

                  <button type='submit' onClick={() => handleEditProduct(product)}>Atualizar</button>
                </Form>
              </Modal>
            </li>
          ))}

        </ul>


      </main>
    </section>

  )
}
