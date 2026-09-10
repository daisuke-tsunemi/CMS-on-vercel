// app/employees/page.tsx
import { getContents } from '@/libs/microcms';
import EmployeesBody from '@/components/EmployeesList/EmployeesBody';
import Header from '@/components/Header';
import type { Employee } from '@/libs/types';
import { FETCH_LIMIT } from '@/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Employees() {
  const employees = await getContents<Employee>('employees', {
    fields: 'id,name,thumbnail,profile',
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="自社担当者一覧" />
      <section>
        <EmployeesBody employees={employees} />
      </section>
    </>
  );
}
