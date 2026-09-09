import { client } from '@/libs/microcms';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import styles from './index.module.scss';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  eyecatch?: {
    url: string;
    height?: number;
    width?: number;
  };
  category?: {
    id: string;
    name: string;
  };
};

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: 'news',
    contentId: id,
  });
  return data;
}

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id).catch(() => null);
  if (!post) notFound();

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YYYY.MM.DD');

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`container__800`}>
        <div className="u-mb40">
          <div className="u-center u-mb32">
            <h1 className={styles.title}>{post.title}</h1>
            <time className="c-txt__sm">{formattedDate}</time>
          </div>
          <Image
            src={post.eyecatch?.url ?? '/img/common/no-image.webp'}
            width={post.eyecatch?.width ?? 800}
            height={post.eyecatch?.height ?? 420}
            sizes="100vw"
            alt="記事のサムネイル"
            priority
            unoptimized // 一時的に追加
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            className={styles.thumbnail}
          />
          <div>
            カテゴリー：<span className={styles.tag}>{post.category && post.category.name}</span>
          </div>
        </div>
        <div>
          <div className={`${'u-align vertical'}`}>
            <div className={`${styles.content}`}>
              <p>{post.description}</p> {/* タイトルを表示 */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* 記事本文を表示 */}
            </div>
          </div>
        </div>
        <div className="u-mt40 u-align center">
          <Link href="/news" className="c-btn__line lg">
            一覧へ
          </Link>
        </div>
      </div>
    </div>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'news' }).catch(() => []);

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
