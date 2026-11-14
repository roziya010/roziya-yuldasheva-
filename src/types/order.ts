export type OrderStatus = 'Yangi' | 'Tayyor';

export interface Order {
  id: string;
  customerName: string;
  description: string;
  deliveryDate: string;
  status: OrderStatus;
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    customerName: 'Sinovchi 01',
    description: '1 ta shokoladli tort',
    deliveryDate: '22.11.2026',
    status: 'Yangi',
  },
  {
    id: '2',
    customerName: 'Sinovchi 02',
    description: '20 ta keks',
    deliveryDate: '23.11.2026',
    status: 'Tayyor',
  },
  {
    id: '3',
    customerName: 'Sinovchi 03',
    description: '2 ta mevali pirog',
    deliveryDate: '24.11.2026',
    status: 'Yangi',
  },
];

export function formatToDisplayDate(rawDate: string): string {
  const trimmed = rawDate.trim();
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}.${month}.${year}`;
  }
  return trimmed;
}
