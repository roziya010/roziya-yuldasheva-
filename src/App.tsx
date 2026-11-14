import React, { useMemo, useRef, useState } from 'react';
import { INITIAL_ORDERS, Order } from './types/order';
import { NewOrderModal } from './components/NewOrderModal';
import { OrderDetailPanel } from './components/OrderDetailPanel';

export default function App() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(() => {
    const total = orders.length;
    const newCount = orders.filter((order) => order.status === 'Yangi').length;
    const readyCount = orders.filter((order) => order.status === 'Tayyor').length;
    return { total, newCount, readyCount };
  }, [orders]);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [orders, selectedOrderId]
  );

  const handleAddOrder = (newOrderData: {
    customerName: string;
    description: string;
    deliveryDate: string;
  }) => {
    const newOrder: Order = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      customerName: newOrderData.customerName,
      description: newOrderData.description,
      deliveryDate: newOrderData.deliveryDate,
      status: 'Yangi',
    };

    setOrders((prev) => [...prev, newOrder]);
    setSelectedOrderId(newOrder.id);
  };

  const handleSelectOrder = (orderId: string, scrollOnMobile = false) => {
    setSelectedOrderId(orderId);
    if (scrollOnMobile && window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'Tayyor' } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#2C1E16]">
      <header className="border-b border-[#E6D9CC] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-xl font-bold tracking-tight text-[#2C1E16] whitespace-nowrap shrink-0 sm:text-2xl">
            Buyurtmalar daftari
          </h1>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex min-h-[44px] sm:min-h-[40px] items-center justify-center rounded-lg bg-[#8C5A3C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#74492F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C] whitespace-nowrap shrink-0"
          >
            + Yangi buyurtma
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section
          aria-label="Buyurtmalar statistikasi"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-[#E6D9CC] bg-white px-5 py-4">
            <p className="text-sm font-medium text-[#6E5A4F]">
              Jami buyurtmalar soni
            </p>
            <p
              data-testid="total-orders-count"
              className="mt-1.5 font-display text-3xl font-bold text-[#2C1E16] tabular-nums"
            >
              {stats.total}
            </p>
          </div>

          <div className="rounded-xl border border-[#E6D9CC] bg-white px-5 py-4">
            <p className="text-sm font-medium text-[#6E5A4F]">
              Yangi buyurtmalar soni
            </p>
            <p
              data-testid="new-orders-count"
              className="mt-1.5 font-display text-3xl font-bold text-[#9A5B13] tabular-nums"
            >
              {stats.newCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#E6D9CC] bg-white px-5 py-4">
            <p className="text-sm font-medium text-[#6E5A4F]">
              Tayyor buyurtmalar soni
            </p>
            <p
              data-testid="ready-orders-count"
              className="mt-1.5 font-display text-3xl font-bold text-[#2D6A4F] tabular-nums"
            >
              {stats.readyCount}
            </p>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <section
            aria-label="Buyurtmalar jadvali"
            className="overflow-hidden rounded-xl border border-[#E6D9CC] bg-white lg:col-span-8"
          >
            <div className="border-b border-[#EFE6DC] px-5 py-4">
              <h2 className="font-display text-base font-semibold text-[#2C1E16]">
                Buyurtmalar ro‘yxati
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[#6E5A4F]">
                  Hozircha buyurtmalar mavjud emas.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#8C5A3C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#74492F]"
                >
                  + Yangi buyurtma
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#EFE6DC] bg-[#FBF8F5] text-xs font-semibold text-[#6E5A4F]">
                      <th scope="col" className="px-3.5 py-3.5 sm:px-5 whitespace-nowrap">
                        Mijoz
                      </th>
                      <th scope="col" className="px-3.5 py-3.5 sm:px-5 whitespace-nowrap">
                        Buyurtma
                      </th>
                      <th scope="col" className="px-3.5 py-3.5 sm:px-5 whitespace-nowrap">
                        Topshirish sanasi
                      </th>
                      <th scope="col" className="px-3.5 py-3.5 sm:px-5 whitespace-nowrap">
                        Holati
                      </th>
                      <th scope="col" className="px-3.5 py-3.5 sm:px-5 text-right whitespace-nowrap">
                        Amallar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3ECE4] text-sm">
                    {orders.map((order) => {
                      const isSelected = order.id === selectedOrderId;
                      const isReady = order.status === 'Tayyor';

                      return (
                        <tr
                          key={order.id}
                          onClick={() => handleSelectOrder(order.id, true)}
                          aria-selected={isSelected}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#F5EDE4]'
                              : 'hover:bg-[#FAF6F1]'
                          }`}
                        >
                          <td className="px-3.5 py-3.5 sm:px-5 font-medium text-[#2C1E16] whitespace-nowrap">
                            {order.customerName}
                          </td>
                          <td className="px-3.5 py-3.5 sm:px-5 text-[#3D2B20]">
                            {order.description}
                          </td>
                          <td className="px-3.5 py-3.5 sm:px-5 text-[#5A463A] tabular-nums whitespace-nowrap">
                            {order.deliveryDate}
                          </td>
                          <td
                            className={`px-3.5 py-3.5 sm:px-5 font-semibold whitespace-nowrap ${
                              isReady ? 'text-[#2D6A4F]' : 'text-[#9A5B13]'
                            }`}
                          >
                            {order.status}
                          </td>
                          <td className="px-3.5 py-3.5 sm:px-5 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOrder(order.id, true);
                              }}
                              className={`min-h-[40px] sm:min-h-[36px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C5A3C] whitespace-nowrap ${
                                isSelected
                                  ? 'border-[#8C5A3C] bg-[#8C5A3C] text-white'
                                  : 'border-[#DFD0C0] bg-white text-[#5A463A] hover:border-[#C9B39E] hover:bg-[#F7F1EB]'
                              }`}
                            >
                              {isSelected ? 'Tanlangan' : 'Ko‘rish'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div ref={detailRef} className="lg:col-span-4">
            <OrderDetailPanel
              selectedOrder={selectedOrder}
              onMarkReady={handleMarkReady}
            />
          </div>
        </div>
      </main>

      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddOrder={handleAddOrder}
      />
    </div>
  );
}
