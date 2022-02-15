import Head from 'next/head';
import { FiTrash, FiCheckSquare, FiEdit3, FiPlus } from 'react-icons/fi'

import styles from './styles.module.scss';

export default function Home() {
  function handleCreateNewProduct() {
    console.log('new product')
  }

  function handleRemoveRecepi() {
    console.log('Removeu')
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>Receitas</title>
      </Head>
      <header className={styles.header}>
        <h2>Minhas receitas</h2>

        <div className={styles['input-group']}>
          <input
            type="text"
            placeholder="Adicionar nova receita"
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewProduct}>
            <FiPlus size={18} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          <li>
            <p>Receita 01</p>

            <div>
              <button type="button" data-testid="remove-task-button" onClick={handleRemoveRecepi}>
                <FiEdit3 size={16} />
              </button>
              <button type="button" data-testid="remove-task-button" onClick={handleRemoveRecepi}>
                <FiTrash size={16} />
              </button>
            </div>

          </li>
        </ul>
      </main>
    </section>

  )
}
