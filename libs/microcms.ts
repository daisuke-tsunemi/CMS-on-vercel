import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}
// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}
// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/** リスト形式 API から contents を取得する（取得失敗時は空配列） */
export async function getContents<T>(
  endpoint: string,
  queries?: MicroCMSQueries,
): Promise<T[]> {
  const data = await client.get({ endpoint, queries }).catch(() => null);
  return (data?.contents ?? []) as T[];
}

/** リスト形式 API から1件取得する（存在しない場合は null） */
export async function getContent<T>(
  endpoint: string,
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<T | null> {
  const data = await client.get({ endpoint, contentId, queries }).catch(() => null);
  return (data ?? null) as T | null;
}

/** generateStaticParams 用の ID 一覧（取得失敗時は空配列） */
export async function getContentIds(endpoint: string): Promise<string[]> {
  return client.getAllContentIds({ endpoint }).catch(() => []);
}
