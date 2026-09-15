import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { MenuManagement } from '@/components/admin/MenuManagement';
import { RevenueAnalytics, BillsList, PopularDishes } from '@/components/admin/Analytics';
import { Customers } from '@/components/admin/Customers';
import { GalleryManagement, EventsAdmin, SettingsAdmin, SimpleAdmin } from '@/components/admin/AdminPages';
import { StaffManagement } from '@/components/admin/StaffManagement';
import { TableManagement } from '@/components/admin/TableManagement';
import { TableOrderDashboard } from '@/components/admin/TableOrderDashboard';
import { NewBill } from '@/components/counter/NewBill';
import { BillHistory } from '@/components/counter/BillHistory';
import { Leaf, Bed, FileText, CreditCard } from 'lucide-react';

export function AdminDashboard() {
  const [page, setPage] = useState('overview');

  return (
    <AdminLayout activePage={page} onNavigate={setPage}>
      {page === 'overview' && <AdminOverview />}
      {page === 'menu' && <MenuManagement />}
      {page === 'specials' && <MenuManagement />}
      {page === 'gallery' && <GalleryManagement />}
      {page === 'ambience' && <SimpleAdmin title="Ambience" icon={Leaf} message="Ambience settings will be available here. Manage gallery images from the Gallery section." />}
      {page === 'new-bill' && <NewBill onBillSaved={() => setPage('bills')} />}
      {page === 'bills' && <BillsList />}
      {page === 'revenue' && <RevenueAnalytics />}
      {page === 'popular' && <PopularDishes />}
      {page === 'payments' && <SimpleAdmin title="Payments" icon={CreditCard} message="Payment breakdown is available in the Revenue Analytics section." />}
      {page === 'customers' && <Customers />}
      {page === 'events' && <EventsAdmin />}
      {page === 'lodging' && <SimpleAdmin title="Rooms / Enquiries" icon={Bed} message="Lodging enquiry management will be available here. Room types are displayed on the public website." />}
      {page === 'tables' && <TableManagement />}
      {page === 'table-orders' && <TableOrderDashboard />}
      {page === 'staff' && <StaffManagement />}
      {page === 'reports' && <SimpleAdmin title="Reports" icon={FileText} message="Detailed reports can be generated from the Revenue Analytics and Bills sections." />}
      {page === 'settings' && <SettingsAdmin />}
    </AdminLayout>
  );
}
