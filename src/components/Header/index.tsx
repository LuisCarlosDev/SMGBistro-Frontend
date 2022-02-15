import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      
      <div>
        <Link href='/'>
          <a>Produtos</a>
        </Link>
        <Link href='/recipes'>
          <a>Receitas</a>
        </Link>
      </div>
    </header>
  )
}