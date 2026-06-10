'use client';

import React, { useState } from 'react';
import { X, Sparkles, Trophy, ArrowRight, ArrowLeft, RefreshCw, Eye } from 'lucide-react';
import { PRODUCTS, Product } from '../data/mockData';
import Link from 'next/link';
import Image from 'next/image';

interface SportsGearFinderWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SportsGearFinderWizard({ isOpen, onClose }: SportsGearFinderWizardProps) {
  const [step, setStep] = useState(1);
  const [playerGroup, setPlayerGroup] = useState('');
  const [budget, setBudget] = useState<[number, number] | null>(null);
  const [sportInterest, setSportInterest] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 3) {
      // Calculate recommendations
      const results = PRODUCTS.filter((product) => {
        // Player/Age Filter
        let groupMatch = true;
        if (playerGroup) {
          if (playerGroup === 'Kids') {
            groupMatch = product.ageGroup.toLowerCase().includes('kids') || 
                         product.ageGroup.toLowerCase().includes('junior') ||
                         product.ageGroup.toLowerCase().includes('all');
          } else if (playerGroup === 'Adults') {
            groupMatch = product.ageGroup.toLowerCase().includes('adult') || 
                         product.ageGroup.toLowerCase().includes('senior') ||
                         product.ageGroup.toLowerCase().includes('all');
          } else {
            groupMatch = true;
          }
        }

        // Budget Filter
        let budgetMatch = true;
        if (budget) {
          budgetMatch = product.price >= budget[0] && product.price <= budget[1];
        }

        // Sport/Category Filter
        let sportMatch = true;
        if (sportInterest) {
          if (sportInterest === 'cricket') {
            sportMatch = product.category === 'Cricket';
          } else if (sportInterest === 'football') {
            sportMatch = product.category === 'Football' || product.category === 'Outdoor Sports';
          } else if (sportInterest === 'badminton') {
            sportMatch = product.category === 'Badminton';
          } else if (sportInterest === 'jersey') {
            sportMatch = product.category === 'Jerseys & Sportswear';
          } else if (sportInterest === 'trophy') {
            sportMatch = product.category === 'Trophies & Medals';
          } else if (sportInterest === 'fitness') {
            sportMatch = product.category === 'Gym & Fitness' || product.category === 'Athletics & Running';
          }
        }

        return groupMatch && budgetMatch && sportMatch;
      });

      // If no exact matches, default to highest rated items in budget
      if (results.length === 0 && budget) {
        const fallback = PRODUCTS.filter(p => p.price >= budget[0] && p.price <= budget[1])
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setRecommendations(fallback);
      } else {
        setRecommendations(results.slice(0, 3));
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const resetWizard = () => {
    setStep(1);
    setPlayerGroup('');
    setBudget(null);
    setSportInterest('');
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      <div className="bg-[var(--background)] border border-[var(--border)] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative transition-all duration-300 flex flex-col max-h-[90vh] animate-pop-in">
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between premium-gradient text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy size={22} className="text-secondary animate-bounce" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-poppins font-extrabold text-lg tracking-tight">Sports Gear Finder</h3>
              <p className="text-xs text-white/80">Find the perfect equipment or apparel in 3 quick steps</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-black/10 rounded-full hover:bg-black/20 text-white transition-colors cursor-pointer"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col justify-center">
          
          {/* Progress Bar */}
          {step <= 4 && (
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-8">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          )}

          {/* STEP 1: Player Group Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-pop-in duration-300">
              <h4 className="font-poppins font-bold text-center text-lg text-[var(--foreground)]">Who is the gear for?</h4>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Kids / Juniors', value: 'Kids' },
                  { label: 'Adults / Seniors', value: 'Adults' },
                  { label: 'School / College Teams', value: 'Teams' },
                  { label: 'All Players', value: 'All' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setPlayerGroup(item.value)}
                    className={`p-4 rounded-2xl border text-center text-sm font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:animate-wobble-hover ${
                      playerGroup === item.value 
                        ? 'border-primary bg-primary/5 text-primary scale-[1.03] shadow-md font-bold' 
                        : 'border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Budget Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-pop-in duration-300">
              <h4 className="font-poppins font-bold text-center text-lg text-[var(--foreground)]">What is your budget?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Under ₹500', value: [0, 500] as [number, number] },
                  { label: '₹500 - ₹1,500', value: [500, 1500] as [number, number] },
                  { label: '₹1,500 - ₹3,000', value: [1500, 3000] as [number, number] },
                  { label: '₹3,000 & Above', value: [3000, 10000] as [number, number] }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setBudget(item.value)}
                    className={`p-4 rounded-2xl border text-center text-sm font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:animate-wobble-hover ${
                      budget && budget[0] === item.value[0] && budget[1] === item.value[1]
                        ? 'border-primary bg-primary/5 text-primary scale-[1.03] shadow-md font-bold' 
                        : 'border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Sport Category Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-pop-in duration-300">
              <h4 className="font-poppins font-bold text-center text-lg text-[var(--foreground)]">Select Sport or Category</h4>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Cricket', value: 'cricket', icon: '🏏' },
                  { label: 'Football & Outdoor', value: 'football', icon: '⚽' },
                  { label: 'Badminton', value: 'badminton', icon: '🏸' },
                  { label: 'Custom Jerseys', value: 'jersey', icon: '👕' },
                  { label: 'Trophies & Medals', value: 'trophy', icon: '🏆' },
                  { label: 'Gym & Fitness', value: 'fitness', icon: '🏋️' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSportInterest(item.value)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center space-y-2 hover:scale-[1.02] hover:animate-wobble-hover group ${
                      sportInterest === item.value 
                        ? 'border-primary bg-primary/5 text-primary scale-[1.03] shadow-md font-bold' 
                        : 'border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)]'
                    }`}
                  >
                    <span className="text-3.5xl group-hover:scale-110 group-hover:animate-wiggle transition-all">{item.icon}</span>
                    <span className="text-[11px] font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Recommendations */}
          {step === 4 && (
            <div className="space-y-5 animate-pop-in duration-300 relative">
              {/* Confetti Animation Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl -mx-6 -my-6 h-[400px]">
                {Array.from({ length: 16 }).map((_, i) => {
                  const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-green-400', 'bg-purple-400', 'bg-pink-400'];
                  const randColor = colors[i % colors.length];
                  const left = `${(i * 6.5) % 100}%`;
                  const delay = `${(i * 0.2).toFixed(1)}s`;
                  const duration = `${(2.5 + (i % 3)).toFixed(1)}s`;
                  return (
                    <div
                      key={i}
                      className={`absolute top-0 w-2 h-2 rounded-full ${randColor} opacity-70`}
                      style={{
                        left,
                        animation: `confetti-fall ${duration} linear ${delay} infinite`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="text-center space-y-1 relative z-10">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-full text-xs font-bold animate-pulse-soft">
                  <Sparkles size={12} className="animate-spin-slow" />
                  <span>Selected Gear for You</span>
                </div>
                <h4 className="font-poppins font-extrabold text-xl text-[var(--foreground)]">Recommended Products</h4>
                <p className="text-xs text-[var(--muted)]">High quality sports equipment based on your needs</p>
              </div>

              <div className="space-y-3.5 pt-2 relative z-10">
                {recommendations.length > 0 ? (
                  recommendations.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center space-x-4 p-3 border border-[var(--border)] rounded-2xl hover:bg-[var(--card)] hover:border-primary/50 hover:scale-[1.01] transition-all duration-200"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image 
                          src={product.images[0]} 
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-xs text-primary font-bold">{product.category}</div>
                        <h5 className="font-bold text-sm text-[var(--foreground)] truncate">{product.name}</h5>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-sm font-extrabold text-[var(--foreground)]">₹{product.price}</div>
                          <div className="text-xs text-amber-500 font-bold">★ {product.rating}</div>
                        </div>
                      </div>
                      <Link 
                        href={`/shop/${product.id}`}
                        onClick={onClose}
                        className="p-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm text-[var(--muted)]">
                    No recommendations found. Try resetting the criteria.
                  </div>
                )}
              </div>

              <button
                onClick={resetWizard}
                className="w-full flex items-center justify-center space-x-2 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-xl hover:bg-[var(--card)] font-bold text-sm transition-all cursor-pointer mt-4"
              >
                <RefreshCw size={16} />
                <span>Start Finder Again</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {step <= 3 && (
          <div className="p-6 border-t border-[var(--border)] bg-[var(--card)] flex justify-between items-center">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="flex items-center space-x-1.5 text-sm font-semibold text-[var(--foreground)] hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}
            
            <button
              onClick={handleNextStep}
              disabled={(step === 1 && !playerGroup) || (step === 2 && !budget) || (step === 3 && !sportInterest)}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-sm transition-all duration-300 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              <span>{step === 3 ? 'See Results' : 'Next'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
