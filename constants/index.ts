// 1ページの表示件数
export const LIMIT = 20;
export const TagLIMIT = 10;
export const HomeLIMIT = 4;

// 絞り込み・ページングはクライアント側で行うため、一覧では API の上限までまとめて取得する
export const FETCH_LIMIT = 100;

// 商談・案件テーブルの表示に必要な項目（参照先は id と表示名のみ取得する）
export const DEALS_LIST_FIELDS =
  'id,title,publishedAt,eyecatch,status,estimated,sales,customer.id,customer.name,employee.id,employee.name';
