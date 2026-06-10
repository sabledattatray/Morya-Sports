import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { BLOGS } from '../../data/mockData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sports Guides, Tips & Training Blog | Morya Sports Badlapur',
  description: 'Read Morya Sports blog for expert advice on selecting cricket bats, custom sublimation jersey designs, tournament organization, and fitness training guides.',
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Sports Tips & Training Blog</h1>
        <p className="text-xs text-[var(--muted)]">Tips on fitness, tournament training, jersey designs, and sports gear selection</p>
      </div>

      {/* Blogs list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {BLOGS.map((blog) => (
          <article 
            key={blog.id}
            className="group border border-[var(--border)] bg-[var(--card)] rounded-[32px] overflow-hidden flex flex-col justify-between h-full card-shadow hover-lift"
          >
            
            {/* Image */}
            <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image src={blog.image} alt={blog.title} width={600} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                {blog.category}
              </span>
            </Link>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider">
                  <span className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="font-poppins font-bold text-lg text-[var(--foreground)] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="border-t border-[var(--border)] pt-4 mt-6 flex justify-between items-center text-xs">
                <span className="text-[var(--muted)] font-bold flex items-center gap-1.5">
                  <User size={12} />
                  <span>By {blog.author}</span>
                </span>
                
                <Link 
                  href={`/blog/${blog.slug}`}
                  className="font-bold text-primary flex items-center space-x-1 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </article>
        ))}
      </div>

    </div>
  );
}
