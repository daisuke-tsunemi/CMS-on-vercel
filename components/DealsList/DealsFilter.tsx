'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Employee } from '@/libs/types';
import styles from '@/components/List/search.module.scss';

type Props = {
  employees: Employee[];
};

export default function DealsFilter({ employees }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const employeeId = searchParams.get('employee') ?? '';

  const handleChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set('employee', next);
    else params.delete('employee');
    // 絞り込みが変わったら1ページ目に戻す
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <fieldset className={`${styles.search__radio} u-align wrap u-gap4`}>
      <label className="u-align u-gap4">
        <input
          type="radio"
          name="employee"
          value=""
          checked={employeeId === ''}
          onChange={(e) => handleChange(e.target.value)}
        />
        <span>すべての担当者</span>
      </label>

      {employees.map((employee) => (
        <label key={employee.id} className="u-align u-gap4">
          <input
            type="radio"
            name="employee"
            value={employee.id}
            checked={employeeId === employee.id}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span>{employee.name}</span>
        </label>
      ))}
    </fieldset>
  );
}
