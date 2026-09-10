// app/activities/page.tsx
import { getContents } from '@/libs/microcms';
import ActivitiesBody from '@/components/ActivitiesList/ActivitiesBody';
import Header from '@/components/Header';
import type { Activity } from '@/libs/types';
import { FETCH_LIMIT } from '@/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Activities() {
  const activities = await getContents<Activity>('activities', {
    fields: 'id,activatedAt,activity-content,activity-next,deals.id,deals.title',
    orders: '-activatedAt',
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="活動履歴一覧" />
      <section>
        <ActivitiesBody activities={activities} />
      </section>
    </>
  );
}
