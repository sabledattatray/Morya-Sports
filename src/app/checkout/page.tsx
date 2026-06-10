'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  CreditCard, 
  MapPin, 
  Truck, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  QrCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Stepper state
  const [step, setStep] = useState(1);
  
  // Shipping Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('421503'); // Default Badlapur East Pincode
  const [shippingMethod, setShippingMethod] = useState<'home' | 'pickup'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  // Razorpay Overlay State
  const [razorpayOpen, setRazorpayOpen] = useState(false);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [razorpaySuccess, setRazorpaySuccess] = useState(false);
  
  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wrapCost = cart.reduce((acc, item) => acc + (item.giftWrap ? 30 * item.quantity : 0), 0);
  const shippingCost = shippingMethod === 'pickup' || subtotal > 999 ? 0 : 50;
  const grandTotal = subtotal + wrapCost + shippingCost;
  const [orderId] = useState(() => 'MS-' + Math.floor(100000 + Math.random() * 900000));

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (cart.length === 0 && !razorpaySuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Checkout is unavailable</h1>
        <p className="text-[var(--muted)] mt-1">Please add items to your cart before checking out.</p>
        <Link href="/shop" className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-xl">
          Go to Shop
        </Link>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Initiate Payment Flow
      if (paymentMethod === 'razorpay') {
        setRazorpayOpen(true);
        setRazorpayLoading(true);
        // Simulate Razorpay popup load
        setTimeout(() => {
          setRazorpayLoading(false);
        }, 1500);
      } else {
        // COD Direct Success
        setRazorpaySuccess(true);
        clearCart();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRazorpayPayment = () => {
    setRazorpayLoading(true);
    setTimeout(() => {
      setRazorpayLoading(false);
      setRazorpaySuccess(true);
      setRazorpayOpen(false);
      clearCart();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col justify-center">
      
      {/* SUCCESS CONFIRMATION VIEW */}
      {razorpaySuccess ? (
        <div className="max-w-xl mx-auto text-center space-y-6 py-12 animate-in fade-in zoom-in duration-300">
          <div className="inline-flex p-4 bg-green-100 dark:bg-green-950/30 text-success rounded-full border border-green-200 dark:border-green-900/30">
            <CheckCircle2 size={56} className="animate-bounce" />
          </div>
          <div>
            <h1 className="text-3xl font-poppins font-black text-success tracking-tight">Order Confirmed!</h1>
            <p className="text-sm text-[var(--muted)] mt-2">
              Thank you for shopping local with Morya Sports Badlapur. Your order has been placed successfully.
            </p>
          </div>

          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl text-left text-sm space-y-3.5 card-shadow">
            <div className="flex justify-between border-b border-[var(--border)] pb-2.5">
              <span className="font-semibold text-[var(--muted)]">Order ID:</span>
              <span className="font-bold text-[var(--foreground)]">{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--border)] pb-2.5">
              <span className="font-semibold text-[var(--muted)]">Delivery Method:</span>
              <span className="font-bold text-[var(--foreground)]">
                {shippingMethod === 'home' ? 'Local Express Delivery' : 'Self Store Pickup'}
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--border)] pb-2.5">
              <span className="font-semibold text-[var(--muted)]">Delivery Estimate:</span>
              <span className="font-bold text-primary">
                {shippingMethod === 'home' ? 'Within 24-48 Hours' : 'Ready today by 4:00 PM'}
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--border)] pb-2.5">
              <span className="font-semibold text-[var(--muted)]">Customer Name:</span>
              <span className="font-bold text-[var(--foreground)]">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[var(--muted)]">Amount Paid:</span>
              <span className="font-extrabold text-[var(--foreground)]">₹{grandTotal}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-md"
            >
              Continue Shopping
            </Link>
            <a 
              href={`https://wa.me/918104812757?text=Hi%20Morya%20Sports!%20I%20just%20placed%20order%20${orderId}%20online%20for%20delivery%20in%20Badlapur.%20Please%20verify.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-success text-success hover:bg-green-50 dark:hover:bg-green-950/20 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Verify on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        /* WIZARD FLOW VIEW */
        <div className="max-w-4xl mx-auto w-full">
          {/* Stepper Header */}
          <div className="flex justify-between items-center max-w-md mx-auto mb-10 text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
            {[
              { num: 1, label: 'Address', icon: <MapPin size={14} /> },
              { num: 2, label: 'Shipping', icon: <Truck size={14} /> },
              { num: 3, label: 'Payment', icon: <CreditCard size={14} /> }
            ].map((s) => (
              <div key={s.num} className="flex items-center space-x-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                  step >= s.num ? 'bg-primary text-white font-extrabold' : 'bg-slate-200 dark:bg-slate-800'
                }`}>
                  {s.num}
                </div>
                <span className={step === s.num ? 'text-primary' : ''}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleNextStep} className="lg:col-span-8 border border-[var(--border)] bg-[var(--card)] p-8 rounded-3xl card-shadow space-y-6">
              
              {/* STEP 1: Address Details */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Shipping Information</h2>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--foreground)] uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--foreground)] uppercase">Phone / WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--foreground)] uppercase">Delivery Address in Badlapur</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Flat/House No, Building, Landmark, Badlapur East/West"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--foreground)] uppercase">Pincode</label>
                      <input 
                        type="text" 
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[var(--foreground)] uppercase">State</label>
                      <input 
                        type="text" 
                        disabled
                        value="Maharashtra"
                        className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-slate-100 dark:bg-slate-800 text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Shipping Methods */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Select Shipping Method</h2>
                  
                  <div className="space-y-3">
                    {([
                      { id: 'home', title: 'Local Home Delivery (Badlapur)', desc: 'Deliver directly to your doorstep in 24-48 hours. Free for orders above ₹999.', cost: subtotal > 999 ? 'FREE' : '₹50' },
                      { id: 'pickup', title: 'Store Self Pickup', desc: 'Pick up your items from Shop No 15, Bebika Palace, Adarsh College Road, Badlapur East. Ready in 4 hours.', cost: 'FREE' }
                    ] as const).map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setShippingMethod(method.id)}
                        className={`w-full text-left p-5 rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer flex justify-between items-center ${
                          shippingMethod === method.id 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-[var(--border)] hover:bg-[var(--background)]'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="font-poppins font-bold text-[var(--foreground)]">{method.title}</h4>
                          <p className="text-xs text-[var(--muted)] font-medium">{method.desc}</p>
                        </div>
                        <span className="text-sm font-extrabold text-primary flex-shrink-0">{method.cost}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Payment Methods */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Select Payment Method</h2>
                  
                  <div className="space-y-3">
                    {([
                      { id: 'razorpay', title: 'UPI / Cards / Net Banking (Razorpay)', desc: 'Pay instantly and securely using Razorpay gateway. Supports GooglePay, PhonePe, Paytm, and Cards.', badge: 'Secure' },
                      { id: 'cod', title: 'Cash / Pay on Delivery (COD)', desc: 'Pay at your doorstep with Cash or scan QR code on delivery.', badge: 'Convenient' }
                    ] as const).map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full text-left p-5 rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer flex justify-between items-center ${
                          paymentMethod === method.id 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-[var(--border)] hover:bg-[var(--background)]'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="font-poppins font-bold text-[var(--foreground)]">{method.title}</h4>
                          <p className="text-xs text-[var(--muted)] font-medium">{method.desc}</p>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded-full flex-shrink-0">{method.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer row */}
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center space-x-1 text-sm font-semibold text-[var(--foreground)] hover:text-primary transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <span>{step === 3 ? 'Place Order' : 'Continue'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </form>

            {/* Checkout Order Summary Column */}
            <aside className="lg:col-span-4 border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-4">
              <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] border-b border-[var(--border)] pb-2">Order Breakdown</h3>
              
              <div className="max-h-[140px] overflow-y-auto space-y-3.5 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs font-semibold">
                    <span className="text-[var(--muted)] truncate max-w-[150px]">{item.product.name} (x{item.quantity})</span>
                    <span className="text-[var(--foreground)]">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Items Subtotal:</span>
                  <span className="text-[var(--foreground)]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Wrapping:</span>
                  <span className="text-[var(--foreground)]">₹{wrapCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Shipping:</span>
                  <span className="text-[var(--foreground)]">
                    {shippingCost === 0 ? <span className="text-success font-bold">FREE</span> : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[var(--border)] pt-2.5 text-sm font-poppins font-extrabold text-[var(--foreground)]">
                  <span>Grand Total:</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      )}

      {/* SIMULATED RAZORPAY POPUP GATEWAY */}
      {razorpayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-all duration-300">
          <div className="bg-slate-900 text-slate-100 border border-slate-800 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative flex flex-col p-6 space-y-6">
            
            {/* Top Logo */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-lg font-bold text-white tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-xs font-black text-white">R</span>
                  Razorpay Secure
                </span>
                <p className="text-[10px] text-slate-500">Trusted by 50 Lakh+ Businesses</p>
              </div>
              <button 
                onClick={() => setRazorpayOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            {/* Middle Section Loader or Scan QR */}
            {razorpayLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <Loader2 size={36} className="text-blue-500 animate-spin" />
                <p className="text-xs font-semibold text-slate-400">Connecting to secure UPI interface...</p>
              </div>
            ) : (
              <div className="space-y-5">
                
                {/* Order Summary */}
                <div className="bg-slate-950 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Pay To: Morya Sports</div>
                    <div className="text-xs text-slate-300 font-semibold">{phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-bold">TOTAL AMOUNT</div>
                    <div className="text-lg font-extrabold text-blue-400">₹{grandTotal}</div>
                  </div>
                </div>

                {/* Simulated Payment details */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulated Payment QR</div>
                  <div className="border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center bg-white text-slate-900 gap-2">
                    <QrCode size={120} className="text-slate-900" />
                    <span className="text-[10px] font-bold text-slate-500">Scan using any UPI App (GPay, PhonePe)</span>
                  </div>
                </div>

                {/* Confirm Payment button */}
                <button
                  onClick={handleRazorpayPayment}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-1.5 shadow"
                >
                  <ShieldCheck size={18} />
                  <span>Authorize Simulation Payment</span>
                </button>
              </div>
            )}

            {/* Secure Badges */}
            <div className="text-center text-[10px] text-slate-600 font-bold flex justify-center items-center gap-1.5 pt-2">
              <Check size={12} className="text-blue-500" /> PCI-DSS Compliant
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <Check size={12} className="text-blue-500" /> 128-bit SSL Secure
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Minimal placeholder close button
function X({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
