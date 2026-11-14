import React from 'react';
import { Check } from 'lucide-react';
import { Order } from '../types/order';

interface OrderDetailPanelProps {
  selectedOrder: Order | null;
  onMarkReady: (orderId: string) => void;
}

export function OrderDetailPanel({
  selectedOrder,
  onMarkReady,
}: OrderDetailPanelProps) {
  if (!selectedOrder) {
    return (
      <section
        aria-label="Tanlangan buyurtma ma’lumotlari"
        className="rounded-xl border border-[#E6D9CC] bg-white p-6"
      >
        <h2 className="font-display text-base font-semibold text-[#2C1E16]">
          Buyurtma tafsilotlari
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#6E5A4F]">
          Barcha ma’lumotlarni ko‘rish va holatini o‘zgartirish uchun jadvaldan istalgan buyurtmani tanlang.
        </p>
      </section>
    );
  }

  const isReady = selectedOrder.status === 'Tayyor';

  return (
    <section
      aria-label="Tanlangan buyurtma ma’lumotlari"
      className="rounded-xl border border-[#E6D9CC] bg-white p-6"
    >
      <div className="border-b border-[#EFE6DC] pb-4">
        <h2 className="font-display text-base font-semibold text-[#2C1E16]">
          Tanlangan buyurtma
        </h2>
      </div>

      <dl className="mt-5 space-y-4">
        <div>
          <dt className="text-xs font-medium text-[#7D685B]">Mijoz ismi</dt>
          <dd className="mt-1 text-base font-semibold text-[#2C1E16]">
            {selectedOrder.customerName}
          </dd>
        </div>

        <div className="border-t border-[#F3ECE4] pt-4">
          <dt className="text-xs font-medium text-[#7D685B]">Buyurtma tavsifi</dt>
          <dd className="mt-1 text-sm leading-relaxed text-[#2C1E16]">
            {selectedOrder.description}
          </dd>
        </div>

        <div className="border-t border-[#F3ECE4] pt-4">
          <dt className="text-xs font-medium text-[#7D685B]">Topshirish sanasi</dt>
          <dd className="mt-1 text-sm font-medium text-[#2C1E16] tabular-nums">
            {selectedOrder.deliveryDate}
          </dd>
        </div>

        <div className="border-t border-[#F3ECE4] pt-4">
          <dt className="text-xs font-medium text-[#7D685B]">Buyurtma holati</dt>
          <dd
            className={`mt-1 text-sm font-semibold ${
              isReady ? 'text-[#2D6A4F]' : 'text-[#9A5B13]'
            }`}
          >
            {selectedOrder.status}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[#EFE6DC] pt-5">
        <button
          type="button"
          onClick={() => onMarkReady(selectedOrder.id)}
          disabled={isReady}
          className={`inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C] whitespace-nowrap ${
            isReady
              ? 'cursor-default border border-[#D8E5DD] bg-[#F3F8F5] text-[#2D6A4F]'
              : 'bg-[#8C5A3C] text-white hover:bg-[#74492F]'
          }`}
        >
          <Check className="h-4 w-4 shrink-0" />
          <span>{isReady ? 'Tayyor holatida' : 'Tayyor deb belgilash'}</span>
        </button>
      </div>
    </section>
  );
}
