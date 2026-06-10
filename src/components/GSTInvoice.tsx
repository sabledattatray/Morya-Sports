'use client';

import React from 'react';
import { CartItem } from '../store/cartStore';

interface GSTInvoiceProps {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  shippingCost: number;
  wrapCost: number;
  grandTotal: number;
  onClose: () => void;
}

const STORE_GSTIN = '27XXXXXX1234M1ZF'; // Demo GSTIN – update with actual GSTIN
const GST_RATE = 18;

export default function GSTInvoice({
  orderId,
  customerName,
  customerPhone,
  customerAddress,
  items,
  shippingCost,
  wrapCost,
  grandTotal,
  onClose,
}: GSTInvoiceProps) {
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const totalBeforeGst = Math.round((grandTotal / (1 + GST_RATE / 100)) * 100) / 100;
  const cgst = Math.round(((grandTotal - totalBeforeGst) / 2) * 100) / 100;
  const sgst = cgst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-4">

        {/* Action bar (hidden in print) */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <h2 className="font-poppins font-bold text-base">GST Tax Invoice</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Invoice body */}
        <div className="p-8 space-y-6 font-sans text-sm" id="gst-invoice">

          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
            <div className="space-y-1">
              <div className="text-2xl font-poppins font-black tracking-tight text-slate-900">
                MORYA <span className="text-primary">SPORTS</span>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                Shop No 15, Bebika Palace,<br />
                Adarsh College Road,<br />
                Badlapur East, Maharashtra 421503<br />
                Ph: 08104812757<br />
                Email: moryasportsbadlapur@gmail.com
              </div>
              <div className="text-xs font-bold text-slate-700 mt-2">GSTIN: {STORE_GSTIN}</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-poppins font-black text-slate-900">TAX INVOICE</div>
              <div className="text-xs text-slate-500">Invoice No: {orderId}</div>
              <div className="text-xs text-slate-500">Date: {invoiceDate}</div>
              <div className="mt-3 px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full inline-block">
                ORIGINAL FOR RECIPIENT
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bill To</div>
              <div className="font-bold text-slate-900">{customerName}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{customerAddress}</div>
              <div className="text-xs text-slate-600">Ph: {customerPhone}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ship To</div>
              <div className="font-bold text-slate-900">{customerName}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{customerAddress}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left py-2.5 px-3 font-bold rounded-tl-lg">#</th>
                <th className="text-left py-2.5 px-3 font-bold">Item Description</th>
                <th className="text-center py-2.5 px-2 font-bold">Qty</th>
                <th className="text-right py-2.5 px-3 font-bold">Unit Price</th>
                <th className="text-right py-2.5 px-3 font-bold rounded-tr-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.product.id} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="py-2.5 px-3 text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800">{item.product.name}</div>
                    <div className="text-[10px] text-slate-400">{item.product.category} | HSN: 9506</div>
                    {item.giftWrap && <div className="text-[10px] text-amber-600">+ Gift Wrapping</div>}
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold text-slate-700">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">₹{item.product.price.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">₹{(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              {wrapCost > 0 && (
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-3 text-slate-500">{items.length + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">Gift Wrapping Service</td>
                  <td className="py-2.5 px-2 text-center font-bold text-slate-700">1</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">₹{wrapCost.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">₹{wrapCost.toFixed(2)}</td>
                </tr>
              )}
              {shippingCost > 0 && (
                <tr className="bg-white">
                  <td className="py-2.5 px-3 text-slate-500">{items.length + (wrapCost > 0 ? 2 : 1)}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">Local Delivery Charges</td>
                  <td className="py-2.5 px-2 text-center font-bold text-slate-700">1</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">₹{shippingCost.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">₹{shippingCost.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Tax & Total Summary */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex justify-between px-4 py-2 bg-slate-50">
                <span className="text-slate-500">Taxable Amount (before GST)</span>
                <span className="font-bold">₹{totalBeforeGst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-slate-500">CGST @ {GST_RATE / 2}%</span>
                <span className="font-bold">₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-2 bg-slate-50">
                <span className="text-slate-500">SGST @ {GST_RATE / 2}%</span>
                <span className="font-bold">₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 bg-slate-900 text-white">
                <span className="font-black uppercase tracking-wide">Grand Total</span>
                <span className="font-black text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="text-[10px] text-slate-500 leading-relaxed">
              <strong>Note:</strong> This is a computer-generated invoice. Prices are inclusive of GST (18%). HSN Code 9506 applies to sports equipment and accessories.
              For any queries, contact us at moryasportsbadlapur@gmail.com or WhatsApp +91 81048 12757.
            </div>
            <div className="text-center text-[10px] font-semibold text-slate-400">
              Thank you for shopping at Morya Sports, Badlapur! 🏆
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
