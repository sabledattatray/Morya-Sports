'use client';

import Image from 'next/image';
import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { BLOGS } from '../../../data/mockData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);

  // Find blog data
  const blog = BLOGS.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Article Not Found</h1>
        <p className="text-[var(--muted)] mt-2">The article you are looking for does not exist or has been removed.</p>
        <Link href="/blog" className="inline-block mt-6 px-6 py-2.5 bg-primary text-white rounded-xl font-bold">
          Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center text-xs text-[var(--muted)] font-semibold gap-1.5">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)] truncate max-w-[200px]">{blog.title}</span>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 bg-[var(--accent-light)] text-primary rounded-full text-xs font-bold uppercase tracking-wider">
          {blog.category}
        </span>
        
        <h1 className="text-3xl sm:text-4xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center space-x-6 text-xs text-[var(--muted)] font-bold uppercase tracking-wider pt-2 border-b border-[var(--border)] pb-6">
          <span className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{blog.date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{blog.readTime}</span>
          </span>
          <span className="flex items-center space-x-1">
            <User size={14} />
            <span>By {blog.author}</span>
          </span>
        </div>
      </div>

      {/* Large Featured Image */}
      <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 border border-[var(--border)] shadow-md">
        <Image src={blog.image} alt={blog.title} width={600} height={600} className="w-full h-full object-cover" />
      </div>

      {/* Body Content */}
      <div className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed space-y-4 pt-4 whitespace-pre-line font-medium text-slate-700 dark:text-slate-300">
        {blog.content}
      </div>

      {/* CTA Box */}
      <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl text-center space-y-4 card-shadow mt-12">
        <h3 className="font-poppins font-bold text-base text-[var(--foreground)]">Looking for high-quality sports gear in Badlapur?</h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed max-w-md mx-auto">We stock all featured items mentioned in our guides. Visit our store or explore our shop catalog online!</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow cursor-pointer">
            Explore Sports Catalog
          </Link>
          <a href="https://wa.me/918104812757" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-success text-success text-xs font-bold rounded-xl transition-all cursor-pointer">
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </article>
  );
}
