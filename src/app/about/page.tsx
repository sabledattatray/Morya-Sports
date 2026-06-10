import React from 'react';
import { Sparkles, Trophy, ShieldCheck, Heart, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Morya Sports Badlapur',
  description: 'Learn about Morya Sports Badlapur — our humble beginnings, our mission to support local athletes, and our journey as Badlapur\'s favorite sports gear and jersey printing shop.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* Intro Hero Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
          <Sparkles size={12} />
          <span>Our Story</span>
        </span>
        <h1 className="text-4xl font-poppins font-black text-[var(--foreground)] tracking-tight leading-none">
          Badlapur&apos;s Best Sports Shop — Morya Sports
        </h1>
        <p className="text-base text-[var(--muted)] leading-relaxed">
          Started with a passion for sports and a mission to provide Badlapur athletes with the best quality gear at the most reasonable price — Morya Sports has grown to become the most trusted sports shop in Badlapur East.
        </p>
      </section>

      {/* Story, Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-[var(--border)] pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-poppins font-bold text-[var(--foreground)]">Our Humble Beginnings</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Located at Shop No 15, Bebika Palace on Adarsh College Road, Badlapur East — Morya Sports started as a small, passionate sports store for the local community. From the beginning, our focus was clear: quality products, honest prices, and supportive staff.
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Today, we supply cricket kits, footballs, badminton rackets, kabaddi gear, custom jerseys, trophies and medals to schools, colleges, clubs, and individual athletes across Badlapur and the surrounding region.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-2xl">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] mb-1">Our Mission</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">To make quality sports equipment accessible to every athlete in Badlapur — from school kids playing their first match to competitive club players needing professional gear.</p>
          </div>
          <div className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-2xl">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] mb-1">Our Vision</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">To become Maharashtra&apos;s most trusted local sports shop — known for genuine branded products, custom jersey printing, and exceptional customer service.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-8 border-t border-[var(--border)] pt-12">
        <h2 className="text-2xl font-poppins font-bold text-center text-[var(--foreground)]">Our Journey</h2>
        <div className="max-w-xl mx-auto relative border-l border-[var(--border)] pl-6 ml-4 sm:ml-auto space-y-8">
          {[
            { year: '2021', title: 'Morya Sports Opens', desc: 'Opened our doors at Adarsh College Road, Badlapur East with a focus on cricket and football equipment for local players.' },
            { year: '2022', title: 'Jersey Printing Launched', desc: 'Started custom sublimation jersey printing service — a game changer for local teams and school sports events.' },
            { year: '2023', title: 'Trophies & Medals', desc: 'Expanded into custom trophies, medals, and shields for tournaments, annual sports days and inter-school competitions.' },
            { year: '2024', title: 'Bulk School Kits', desc: 'Began supplying complete sports kits and PT uniforms to schools and colleges across Badlapur region.' },
            { year: '2026', title: 'Online Store Launch', desc: 'Launched our digital store to allow customers to browse our full catalogue and place orders online!' }
          ].map((milestone, idx) => (
            <div key={idx} className="relative hover:translate-x-1.5 transition-all duration-300 group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-[var(--card)] group-hover:scale-125 group-hover:bg-secondary transition-all" />
              <div className="text-xs font-bold text-primary mb-0.5 group-hover:text-secondary transition-colors">{milestone.year}</div>
              <h3 className="font-poppins font-bold text-sm text-[var(--foreground)]">{milestone.title}</h3>
              <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{milestone.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sports Gallery */}
      <section className="space-y-6 border-t border-[var(--border)] pt-12">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-poppins font-bold text-[var(--foreground)]">Sports We Cover</h2>
          <p className="text-xs text-[var(--muted)]">All the equipment you need — from cricket to kabaddi, athletics to gym</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow md:col-span-2 md:row-span-2 group">
            <Image src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80" alt="Cricket equipment" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
              <span className="text-white font-poppins font-bold text-sm">Cricket Equipment</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group">
            <Image src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80" alt="Football" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Football</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group md:row-span-2">
            <Image src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80" alt="Trophies and medals" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Trophies & Medals</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group">
            <Image src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80" alt="Badminton" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Badminton</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group">
            <Image src="https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=600&q=80" alt="Custom jerseys" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Custom Jerseys</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group">
            <Image src="https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80" alt="Gym & Fitness" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Gym & Fitness</span>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] card-shadow group">
            <Image src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=600&q=80" alt="Volleyball" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
              <span className="text-white font-poppins font-bold text-xs">Volleyball</span>
            </div>
          </div>
        </div>
      </section>

      {/* Store Trust Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--border)] pt-12 text-center">
        {[
          { icon: <Trophy className="text-primary mx-auto" size={28} fill="currentColor" />, title: 'Branded Products', desc: 'SG, Nivia, Yonex, Cosco — 100% genuine brands' },
          { icon: <ShieldCheck className="text-secondary mx-auto" size={28} />, title: 'Best Price Guarantee', desc: 'Lowest prices in Badlapur — value for money' },
          { icon: <Heart className="text-red-500 mx-auto" size={28} />, title: 'Happy Customers', desc: 'Hundreds of 5-star Google reviews from Badlapur' },
          { icon: <Calendar className="text-accent mx-auto" size={28} />, title: 'Open Daily', desc: 'Mon–Sun: 9:00 AM – 9:00 PM' }
        ].map((item, idx) => (
          <div key={idx} className="space-y-2">
            {item.icon}
            <h4 className="font-poppins font-bold text-sm text-[var(--foreground)]">{item.title}</h4>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Single Location Card */}
      <section className="space-y-8 border-t border-[var(--border)] pt-12">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-poppins font-bold text-[var(--foreground)]">Our Shop Location</h2>
          <p className="text-xs text-[var(--muted)]">Visit us at Adarsh College Road, Badlapur East for the best sports gear in the region</p>
        </div>

        <div className="max-w-sm mx-auto p-5 border border-[var(--border)] bg-[var(--card)] rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group">
          <div className="flex items-start space-x-2.5">
            <MapPin className="text-primary mt-0.5 group-hover:scale-110 transition-transform" size={16} />
            <div>
              <h4 className="font-poppins font-bold text-sm text-[var(--foreground)]">Morya Sports Badlapur</h4>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[var(--muted)]">Flagship Store</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[var(--muted)] font-semibold border-t border-[var(--border)]/50 pt-2">
            Shop No 15, Bebika Palace, Adarsh College Road, Badlapur East
          </div>
        </div>
      </section>

    </div>
  );
}
