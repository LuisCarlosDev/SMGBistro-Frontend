import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import { FiTrash, FiEdit3, FiX } from 'react-icons/fi'
import { RecipeContext } from '../../hooks/recipe';

import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import api from '../../services/api';

type Recepi = {
  id: string;
  name: string;
  prepare: string;
  ingredients: string;
}

type RecepiProps = {
  recepis: Recepi[];
}

export default function Home({ recepis }: RecepiProps) {
  const { createRecipe, deleteRecipe } = useContext(RecipeContext);

  const [isCreateRecipeModal, setIsCreateRecipeModal] = useState(false);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [prepare, setPrepare] = useState('');

  async function handleCreateNewProduct(event: FormEvent) {
    event.preventDefault();

    await createRecipe({
      name,
      ingredients,
      prepare,
    })

    setName('');
    setIngredients('')
    setPrepare('')
    setIsCreateRecipeModal(false);

    window.location.reload();
  }

  function handleRemoveRecepi(id: string) {
    deleteRecipe(id);
  }

  function handleOpenCreateRecipeModal() {
    setIsCreateRecipeModal(true);
  }

  function handleCloseCreateRecipeModal() {
    setIsCreateRecipeModal(false);
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Receitas</title>
      </Head>
      <header className={styles.header}>
        <h2>Minhas receitas</h2>

        <div className={styles['input-group']}>
          <button type="submit" data-testid="add-task-button" onClick={handleOpenCreateRecipeModal}>
            Cadastrar nova receita
          </button>
        </div>

        <Modal
          isOpen={isCreateRecipeModal}
          onRequestClose={handleCloseCreateRecipeModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
          <button
            onClick={handleCloseCreateRecipeModal}
            className="react-modal-close"
          >
            <FiX size={18} color='#3D3D4D' />
          </button>
          <form
            onSubmit={handleCreateNewProduct}
            className={styles.formModal}
          >
            <h2>Cadastrar receita</h2>
            <input
              value={name}
              placeholder='Nome'
              onChange={e => setName(e.target.value)}
            />
            <textarea
              value={ingredients}
              placeholder='Ingredientes'
              onChange={e => setIngredients(e.target.value)}
            />
            <input
              value={prepare}
              placeholder='Preparação'
              onChange={e => setPrepare(e.target.value)}
            />

            <button type='submit'>Cadastrar</button>
          </form>
        </Modal>
      </header>

      <main>
        <ul>
          {recepis.map(recepi => (
            <li key={recepi.id}>
              <section>
                <p>{recepi.name}</p>
                <aside>{recepi.ingredients}</aside>
                <span>{recepi.prepare}</span>
              </section>
              <div>
                <button type="button" data-testid="remove-task-button">
                  <FiEdit3 size={16} />
                </button>
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveRecepi(recepi.id)}
                >
                  <FiTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/recepis');

  const recepis = response.data;

  return {
    props: {
      recepis
    }
  }
}