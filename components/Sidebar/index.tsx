import Image from 'next/image';
import GlobalNav from '@/components/GlobalNav';
import styles from './index.module.scss';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
        <Image
          src="/img/common/logo/logo_simple.svg"
          alt="ロゴ"
          className={styles.sidebar__logo}
          width={58}
          height={18}
          priority
        />
      <GlobalNav />
    </aside>
  );
}
