'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, PenTool } from 'lucide-react';
import Image from 'next/image';
import { REVIEWS as initialReviews, Review } from '../../data/mockData';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newReview: Review = {
      id: 'rev-' + (reviews.length + 1),
      author: author.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', // Default generic avatar
      rating,
      date: 'Just now',
      text: text.trim()
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAuthor('');
      setText('');
      setRating(5);
      setFormOpen(false);
    }, 2000);
  };

  // Calculations for rating breakdown
  const ratingBreakdown: Record<number, number> = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };
  const totalRatingCount = reviews.length;
  const averageRating = totalRatingCount > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalRatingCount).toFixed(1)
    : '5.0';
  const avgStars = Math.round(parseFloat(averageRating));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Customer Reviews</h1>
        <p className="text-xs text-[var(--muted)]">See what local Badlapur athletes say about Morya Sports</p>
      </div>

      {/* Ratings Dashboard breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 rounded-3xl card-shadow">
        
        {/* Rating Score */}
        <div className="md:col-span-4 text-center space-y-2 border-b md:border-b-0 md:border-r border-[var(--border)] pb-6 md:pb-0">
          <div className="text-5xl font-poppins font-black text-[var(--foreground)]">{averageRating}</div>
          <div className="flex justify-center text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                fill={i < avgStars ? 'currentColor' : 'none'} 
                className={i < avgStars ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'} 
              />
            ))}
          </div>
          <div className="text-xs font-semibold text-[var(--muted)]">Based on {totalRatingCount} store reviews</div>
          
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 cursor-pointer mt-2"
          >
            <PenTool size={12} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Bar Chart breakdown */}
        <div className="md:col-span-8 space-y-2.5 text-xs font-semibold text-[var(--foreground)] px-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingBreakdown[stars] || 0;
            const percentage = totalRatingCount > 0 ? (count / totalRatingCount) * 100 : 0;
            return (
              <div key={stars} className="flex items-center space-x-3">
                <span className="w-3 text-right">{stars}</span>
                <Star size={12} fill="currentColor" className="text-amber-500" />
                <div className="flex-grow bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="w-6 text-[var(--muted)]">({count})</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a review form modal (toggleable) */}
      {formOpen && (
        <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow max-w-xl mx-auto space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center border-b border-[var(--border)] pb-2">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)]">Write Your Review</h3>
            <button onClick={() => setFormOpen(false)} className="text-xs font-bold text-primary hover:underline">Cancel</button>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-2 flex flex-col items-center">
              <CheckCircle size={32} className="text-success animate-bounce" />
              <h4 className="font-bold text-success text-sm">Review Submitted!</h4>
              <p className="text-xs text-[var(--muted)]">Thank you for sharing your feedback.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase block">Select Rating</label>
                <div className="flex space-x-1.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patil"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase">Your Review Comments</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell others about your experience at Morya Sports..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow"
              >
                Submit Store Review
              </button>

            </form>
          )}
        </div>
      )}

      {/* Reviews Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-3xl card-shadow flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border)] relative flex-shrink-0">
                    <Image 
                      src={rev.avatar} 
                      alt={rev.author} 
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--foreground)]">{rev.author}</h4>
                    <span className="text-[10px] text-[var(--muted)] font-semibold">{rev.date}</span>
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={14} 
                      fill={idx < rev.rating ? 'currentColor' : 'none'} 
                      className={idx < rev.rating ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed italic">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            {rev.response && (
              <div className="mt-4 p-3 bg-[var(--accent-light)] rounded-xl border border-[var(--border)] text-xs text-[var(--foreground)]">
                <span className="font-bold text-primary">Response from Owner: </span>
                {rev.response}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
