import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import '@/styles/css/globals.css';
import styles from './layout.module.scss';
import { Suspense } from 'react';
import { Metadata } from 'next';
import SvgDefs from '@/components/SvgDefs';
import { montserrat, zenKaku } from '@/libs/fonts';

export const revalidate = 86400;
// キャッシュの再生成は1日間に1回（デフォは60秒に1回になっているので注意）

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://inner-communication.vercel.app'),
  robots: 'noindex, nofollow',
  title: {
    template: '%s | Sample CMS',
    default: 'Sample CMS | 世代を超えて学ぶパソコン・プログラミングスクール',
  },
  description:
    'Sample CMSは、9歳のお子様から80歳のシニアまで通える地域のパソコン・プログラミングスクールです。Scratchを使ったキッズプログラミングから、大人のエクセル・ワード基礎、シニア向けの個別学習まで、あなたの「やりたい」を全力でサポートします。',
  keywords: 'パソコン教室,プログラミングスクール,Scratch,子供,シニア,初心者,Sample CMS',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: {
      template: '%s | Sample CMS',
      default: 'Sample CMS | 世代を超えて学ぶパソコン・プログラミングスクール',
    },
    description:
      'Sample CMSは、9歳から80歳まで通える地域のパソコン教室です。キッズプログラミングから大人の個別学習まで、あなたの「やりたい」を叶えます。',
    images: ['/ogp.jpg'],
    type: 'website',
    url: '/',
    locale: 'ja_JP',
    siteName: 'Sample CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sample CMS | 世代を超えて学ぶパソコン・プログラミングスクール',
    description:
      'Sample CMSは、9歳から80歳まで通える地域のパソコン教室です。キッズプログラミングから大人の個別学習まで、あなたの「やりたい」を叶えます。',
    images: ['/twitter-image.jpg'],
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ja" className={`${montserrat.variable} ${zenKaku.variable}`} data-scroll-behavior="smooth">
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <body>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <SvgDefs />
          <div className={styles.wrapper}>
            <Sidebar />
            <main className={styles.main}>
              <Header />
              <div className={styles.wrapperContent}>
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
