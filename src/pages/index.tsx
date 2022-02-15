import Head from 'next/head';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FiTrash, FiX, FiEdit3, FiPlus } from 'react-icons/fi'
import api from '../services/api';

import styles from '../styles/home.module.scss';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

type ProductResponse = {
  id: string;
  name: string;
}

export default function Home() {
  const formRef = useRef<FormHandles>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [editProduct, setEditProduct] = useState<ProductResponse>({} as ProductResponse);
  const [isEditProductModal, setIsEditProductModal] = useState(false);
  const [titleProduct, setTitleProduct] = useState('');

  useEffect(() => {
    async function productList() {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    productList();
  }, []);

  function handleCreateNewProduct() {
    async function addProduct(data: ProductResponse) {
      formRef.current.setErrors({});

      const response = await api.post('/products', data)

      // setProducts();
    }

    addProduct()
  }

  async function handleRemoveProduct(id: string) {
    await api.delete(`/products/${id}`);

    const newProductList = products.filter(currentProduct => currentProduct.id !== id);
    setProducts(newProductList);
  }

  function handleOpenEditProductModal() {
    setIsEditProductModal(true);
  }

  function handleCloseEditProductModal() {
    setIsEditProductModal(false);
  }

  async function handleEditProduct(product: ProductResponse): Promise<void> {
    await api.put(`/products/${product.id}`, {
      id: product.id,
      name: product.name
    })
    // setEditProduct(response.data);
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Produtos</title>
      </Head>
      <header className={styles.header}>
        <h2>Meus Produtos</h2>

        <div className={styles['input-group']}>
          <input
            type="text"
            placeholder="Adicionar novo produto"
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewProduct}>
            <FiPlus size={18} color="#fff" />
          </button>
        </div>
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
                  onSubmit={() => handleEditProduct(product)}
                  className={styles.formModal}
                >
                  <h2>Editar produto</h2>
                  <input
                    value={titleProduct}
                    placeholder='Novo nome'
                    onChange={e => setTitleProduct(e.target.value)}
                  />

                  <button type='submit'>Atualizar</button>
                </Form>
              </Modal>
            </li>
          ))}

        </ul>


      </main>
    </section>

  )
}
