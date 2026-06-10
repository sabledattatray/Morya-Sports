'use client';

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Navigation, CheckCircle, Trophy, Shirt, ShieldCheck, Zap } from 'lucide-react';
import { BUSINESS_HOURS_LIST } from '../../utils/timings';

const SERVICES = [
  {
    name: 'Jersey Printing',
    desc: 'Full sublimation, screen printing, and heat transfer name/number printing for team jerseys.',
    icon: <Shirt size={18} />,
    time: '5–7 Days'
  },
  {
    name: 'Trophy Engraving',
    desc: 'Custom text and logo engraving on cups, medals, shields, and award plaques.',
    icon: <Trophy size={18} />,
    time: '2–3 Days'
  },
  {
    name: 'Cricket Bat Prep',
    desc: 'Professional bat knocking, oiling, grip fitting, and toe guard application.',
    icon: <Zap size={18} />,
    time: '1–2 Days'
  },
  {
    name: 'Bulk School Kits',
    desc: 'Supplying complete sports kits, PT uniforms, and training gear for local schools.',
    icon: <ShieldCheck size={18} />,
    time: 'Varies'
  }
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Morya+Sports+Bebika+Palace+Adarsh+College+Road+Badlapur+East', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="mb-10 space-y-1 text-center">
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Contact Us</h1>
        <p className="text-xs text-[var(--muted)]">Reach out for custom jerseys, bulk tournament orders, or store directions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Info & Map Column */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-6">
            <h2 className="font-poppins font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-2">Store Information</h2>
            
            <ul className="space-y-4 text-xs font-semibold">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-[var(--foreground)] leading-relaxed">
                  Shop No 15, Bebika Palace, Adarsh College Road, Badlapur East, Maharashtra 421503
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <a href="tel:08104812757" className="text-[var(--foreground)] hover:text-primary transition-colors cursor-pointer">08104812757</a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle size={16} className="text-success flex-shrink-0" />
                <a href="https://wa.me/918104812757" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-success transition-colors cursor-pointer">08104812757 (WhatsApp Support)</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:moryasportsbadlapur@gmail.com" className="text-[var(--foreground)] hover:text-accent transition-colors cursor-pointer">moryasportsbadlapur@gmail.com</a>
              </li>
            </ul>

            {/* Directions button */}
            <button
              onClick={handleDirections}
              className="w-full py-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer hover:bg-slate-800"
            >
              <Navigation size={14} className="text-secondary" />
              <span>Get Directions on Google Maps</span>
            </button>
          </div>

          {/* Business Timings Table card */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-3">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] flex items-center space-x-2 border-b border-[var(--border)] pb-2">
              <Clock size={16} className="text-primary" />
              <span>Opening Hours</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {BUSINESS_HOURS_LIST.map((bh) => (
                <li key={bh.day} className="flex justify-between pb-1 border-b border-[var(--border)] font-semibold text-[var(--foreground)]">
                  <span className="text-[var(--muted)]">{bh.day}:</span>
                  <span>{bh.hours}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 border border-[var(--border)] bg-[var(--card)] p-8 rounded-3xl card-shadow flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Send an Enquiry</h2>
            
            {submitted ? (
              <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in duration-300">
                <CheckCircle size={36} className="text-success animate-bounce" />
                <h4 className="font-poppins font-bold text-success text-sm">Message Sent!</h4>
                <p className="text-xs text-[var(--muted)] max-w-xs">Thank you {name}. We received your message and will reply via phone/email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--foreground)] uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--foreground)] uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--foreground)] uppercase">Your Inquiry Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What would you like to ask us? (e.g. details on team jerseys, cricket kits, trophies)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Send Inquiry Message
                </button>

              </form>
            )}

          </div>

          <div className="border-t border-[var(--border)] pt-4 mt-6 text-[10px] text-[var(--muted)] font-semibold flex items-center space-x-1.5 justify-center">
            <span>Or message us directly for faster response: </span>
            <a href="https://wa.me/918104812757" target="_blank" rel="noopener noreferrer" className="text-success hover:underline">Chat on WhatsApp</a>
          </div>

        </div>

      </div>

      {/* Services Section */}
      <div className="mt-16 border-t border-[var(--border)] pt-12 space-y-8 animate-in fade-in duration-500">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-poppins font-bold text-[var(--foreground)]">Specialized Services</h2>
          <p className="text-xs text-[var(--muted)]">Professional sports customization and prep services at reasonable prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border border-[var(--border)] bg-[var(--card)] p-5 rounded-2xl card-shadow flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] group-hover:text-primary transition-colors">{service.name}</h3>
                  <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed font-semibold">{service.desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-bold">
                <span className="text-[var(--muted)]">Est. Time: {service.time}</span>
                <a
                  href={`https://wa.me/918104812757?text=Hi%20Morya%20Sports!%20I%20want%20to%20enquire%20about%20your%20${encodeURIComponent(service.name)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors inline-flex items-center space-x-1"
                >
                  <span>Enquire</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
