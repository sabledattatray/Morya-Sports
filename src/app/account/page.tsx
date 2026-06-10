'use client';

import React, { useState } from 'react';
import { User, ShoppingBag, MapPin, Bell } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'notifications'>('profile');

  // Simulated User Data
  const profile = {
    name: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@gmail.com',
    phone: '+91 98200 12345',
    joined: 'Jan 15, 2026'
  };

  const orders = [
    { id: 'TS-482910', date: 'May 12, 2026', total: 2499, status: 'Delivered', items: 'Super High-Speed RC Rally Car (x1)' },
    { id: 'TS-103948', date: 'April 02, 2026', total: 999, status: 'Delivered', items: 'Hot Wheels 10-Car Pack (x1)' }
  ];

  const addresses = [
    { id: 1, type: 'Home', text: 'Flat 402, Shiv Shakti Tower, Katrap Road, Badlapur East, Maharashtra 421503' },
    { id: 2, type: 'Office', text: 'Shop 4, Kartik Complex, Near Municipal Corporation, Badlapur East, Maharashtra 421503' }
  ];

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User size={16} /> },
    { id: 'orders', label: 'Order History', icon: <ShoppingBag size={16} /> },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> }
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">My Account</h1>
        <p className="text-xs text-[var(--muted)]">Manage your orders, profile details, and delivery settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="md:col-span-4 border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow">
          <div className="flex items-center space-x-3.5 border-b border-[var(--border)] pb-6 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-poppins font-black text-xl">
              R
            </div>
            <div>
              <h2 className="font-poppins font-bold text-base text-[var(--foreground)]">{profile.name}</h2>
              <span className="text-[10px] text-[var(--muted)] font-semibold uppercase tracking-wider">Shopper Premium</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Column */}
        <section className="md:col-span-8 border border-[var(--border)] bg-[var(--card)] p-8 rounded-3xl card-shadow">
          
          {/* PROFILE DETAIL VIEW */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-poppins font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">Profile Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-[var(--muted)] font-semibold block mb-1">Full Name</span>
                  <div className="font-bold text-[var(--foreground)] p-3 border border-[var(--border)] bg-[var(--background)] rounded-xl">{profile.name}</div>
                </div>
                <div>
                  <span className="text-xs text-[var(--muted)] font-semibold block mb-1">Email Address</span>
                  <div className="font-bold text-[var(--foreground)] p-3 border border-[var(--border)] bg-[var(--background)] rounded-xl">{profile.email}</div>
                </div>
                <div>
                  <span className="text-xs text-[var(--muted)] font-semibold block mb-1">Phone Number</span>
                  <div className="font-bold text-[var(--foreground)] p-3 border border-[var(--border)] bg-[var(--background)] rounded-xl">{profile.phone}</div>
                </div>
                <div>
                  <span className="text-xs text-[var(--muted)] font-semibold block mb-1">Member Since</span>
                  <div className="font-bold text-[var(--foreground)] p-3 border border-[var(--border)] bg-[var(--background)] rounded-xl">{profile.joined}</div>
                </div>
              </div>
              
              <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800">
                Edit Profile Details
              </button>
            </div>
          )}

          {/* ORDERS HISTORIES VIEW */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-poppins font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">Order History</h3>
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 border border-[var(--border)] bg-[var(--background)] rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-[var(--foreground)]">{ord.id}</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400 text-[10px] font-bold rounded-full">{ord.status}</span>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{ord.items}</p>
                      <span className="text-[10px] text-[var(--muted)] block font-semibold">{ord.date}</span>
                    </div>
                    <div className="text-right sm:self-center">
                      <div className="text-xs text-[var(--muted)]">Total paid</div>
                      <div className="text-base font-extrabold text-[var(--foreground)]">₹{ord.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDRESS DETAILS VIEW */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-poppins font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">Saved Delivery Addresses</h3>
              <div className="space-y-4">
                {addresses.map((adr) => (
                  <div key={adr.id} className="p-5 border border-[var(--border)] bg-[var(--background)] rounded-2xl">
                    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-2.5 uppercase">
                      {adr.type}
                    </span>
                    <p className="text-xs text-[var(--foreground)] leading-relaxed font-semibold">{adr.text}</p>
                  </div>
                ))}
              </div>
              <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800">
                + Add New Address
              </button>
            </div>
          )}

          {/* NOTIFICATION SETTINGS VIEW */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-poppins font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">Notification Preferences</h3>
              
              <div className="space-y-4 text-sm font-semibold">
                <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                  <div>
                    <h4 className="text-[var(--foreground)]">WhatsApp Order Updates</h4>
                    <p className="text-[10px] text-[var(--muted)]">Receive tracking links, digital receipts, and timings on WhatsApp.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary border-[var(--border)]" />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                  <div>
                    <h4 className="text-[var(--foreground)]">Email Offers & Deals</h4>
                    <p className="text-[10px] text-[var(--muted)]">Receive notifications about monthly sales, holiday events, and discount coupons.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary border-[var(--border)]" />
                </div>
              </div>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
