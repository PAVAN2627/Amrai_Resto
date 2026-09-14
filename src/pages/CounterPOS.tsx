import { useState } from 'react';
import { CounterLayout } from '@/components/counter/CounterLayout';
import { NewBill } from '@/components/counter/NewBill';
import { BillHistory, TodaySales, CustomerSearch } from '@/components/counter/BillHistory';

export function CounterPOS() {
  const [page, setPage] = useState('new-bill');

  return (
    <CounterLayout activePage={page} onNavigate={setPage}>
      {page === 'new-bill' && <NewBill onBillSaved={() => setPage('history')} />}
      {page === 'history' && <BillHistory />}
      {page === 'sales' && <TodaySales />}
      {page === 'customer' && <CustomerSearch />}
    </CounterLayout>
  );
}
