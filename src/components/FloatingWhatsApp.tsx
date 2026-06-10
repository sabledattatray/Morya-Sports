'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquareText } from 'lucide-react';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const phoneNumber = '918104812757';

  const getPrefilledMessage = () => {
    const baseMsg = 'Hello Morya Sports Badlapur! ';

    if (pathname.includes('/shop/')) {
      return encodeURIComponent(baseMsg + 'I am interested in this product: ' + (typeof window !== 'undefined' ? window.location.href : ''));
    }
    if (pathname.includes('/categories/jerseys-sportswear')) {
      return encodeURIComponent(baseMsg + 'I want to order custom printed jerseys for my team. Please share details about pricing, minimum quantity and delivery time.');
    }
    if (pathname.includes('/categories/trophies-medals')) {
      return encodeURIComponent(baseMsg + 'I need trophies and medals for a sports event. Please share your catalogue and pricing.');
    }
    if (pathname.includes('/categories/cricket')) {
      return encodeURIComponent(baseMsg + 'I want to enquire about cricket equipment — bats, pads, helmets or full kit packages.');
    }
    if (pathname.includes('/categories/school-sports')) {
      return encodeURIComponent(baseMsg + 'I am looking for bulk school sports kits. Please share your school pricing and available options.');
    }
    if (pathname.includes('/cart')) {
      return encodeURIComponent(baseMsg + 'I need help with my order or want to place a bulk team order.');
    }

    return encodeURIComponent(baseMsg + 'I would like to enquire about your sports products, jersey printing or trophy orders.');
  };

  const handleWhatsAppRedirect = () => {
    const message = getPrefilledMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppRedirect}
      className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-success hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none cursor-pointer"
      title="Chat with us on WhatsApp"
      aria-label="Chat with Morya Sports on WhatsApp"
    >
      <MessageSquareText size={24} className="animate-pulse" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap font-bold text-sm">
        WhatsApp Order
      </span>
    </button>
  );
}
