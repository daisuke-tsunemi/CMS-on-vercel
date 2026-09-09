import { client } from '@/libs/microcms';
import ArticleList, { type Post } from '@/components/ArticleList';
import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.scss';
import { HomeLIMIT } from '@/constants';

const PER_PAGE = HomeLIMIT; // 1ページあたりの表示件数

// microCMSからブログ記事を取得
async function getBlogPosts(page: number = 1) {
  const offset = (page - 1) * PER_PAGE;
  const data = await client.get({
    endpoint: 'news',
    queries: {
      fields: 'id,eyecatch,title,publishedAt,category.id,category.name',
      limit: PER_PAGE,
      offset: offset,
    },
  });
  return {
    contents: data.contents as Post[],
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // Promiseを追加
}) {
  const params = await searchParams; // awaitで取得
  const currentPage = Number(params.page) || 1;
  const { contents: posts } = await getBlogPosts(currentPage);
  return (
    <div className={`${styles.wrapper}`}>
      <section id="cta" className={`${styles.cta} container`}>
        <div className='container'>
          <div className={`${styles.section__content}`}>
            <div className={`${styles.section__text} u-mt32`}>
              <div className={`${styles.section__title} u-mb40 u-align between`}>
                <h2 className='c-heading--4xl weight__500'>新着情報</h2>
                <Link href="/news" className="c-btn__line sm">
                    新着情報一覧へ
                  </Link>
              </div>
              <div>
                <div className={`${styles.news__content} ${'container'}`}>
                  <div className={`${styles.news__list} ${'p-section__body'}`}>
                    <ArticleList posts={posts} />
                  </div>
                </div>
                <p className="c-txt__lg weight__500">お気軽にご相談ください。</p>
              </div>
            </div>
            <div className={`${styles.quote} ${'u-mt40'}`}>
              <h3 className="">アクセス</h3>
              <p className="u-mt16">
                <strong>住所</strong>
                <br />
                〒100-8111
                <br />
                東京都千代田区千代田１−１
              </p>
              <p className="u-mt16">
                <strong>電話番号</strong>
                <br />
                090-1234-5678
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
