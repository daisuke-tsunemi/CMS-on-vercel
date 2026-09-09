import Link from 'next/link';
import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className='c-heading--lg'>ダッシュボード</h1>
    </header>
  );
}
