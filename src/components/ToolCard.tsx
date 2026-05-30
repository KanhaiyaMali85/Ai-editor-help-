/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Video, Image as ImageIcon, Palette, 
  Sliders, Mic, Smartphone, Camera, Check, Star, 
  Award, ShieldCheck, ChevronDown, ChevronUp, Plus, Minus
} from 'lucide-react';
import { Tool, LanguagePack } from '../types';

interface ToolCardProps {
  key?: string;
  tool: Tool;
  activeLanguage: LanguagePack;
  languageCode: 'en' | 'hi';
  isDarkMode: boolean;
  onCompareToggle: (toolId: string) => void;
  isInComparison: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Video: Video,
  Smartphone: Smartphone,
  Image: ImageIcon,
  Palette: Palette,
  Sliders: Sliders,
  Mic: Mic,
  Sparkles: Sparkles,
  Camera: Camera,
};

export default function ToolCard({ 
  tool, 
  activeLanguage, 
  languageCode, 
  isDarkMode, 
  onCompareToggle, 
  isInComparison 
}: ToolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const IconComponent = ICON_MAP[tool.iconName] || Sparkles;

  // Render rating stars
  const renderStars = (rating: number) => {
    const stars = [];
    const absolute = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= absolute) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />);
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 shrink-0" />);
      }
    }
    return stars;
  };

  // Skill colors mapping
  const skillColor = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60',
    Professional: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/60',
  }[tool.skillLevel];

  // Accent colors for dynamic glows
  const accentGlow = {
    emerald: 'shadow-emerald-500/5 hover:border-emerald-400/50 dark:hover:border-emerald-500/40',
    cyan: 'shadow-cyan-500/5 hover:border-cyan-400/50 dark:hover:border-cyan-500/40',
    blue: 'shadow-blue-500/5 hover:border-blue-400/50 dark:hover:border-blue-500/40',
    purple: 'shadow-purple-500/5 hover:border-purple-400/50 dark:hover:border-purple-500/40',
    indigo: 'shadow-indigo-500/5 hover:border-indigo-400/50 dark:hover:border-indigo-500/40',
    pink: 'shadow-pink-500/5 hover:border-pink-400/50 dark:hover:border-pink-500/40',
    violet: 'shadow-violet-500/5 hover:border-violet-400/50 dark:hover:border-violet-500/40',
    amber: 'shadow-amber-500/5 hover:border-amber-400/50 dark:hover:border-amber-500/40',
  }[tool.colorClass] || 'hover:border-blue-500/40';

  const accentText = {
    emerald: 'text-emerald-500',
    cyan: 'text-cyan-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    indigo: 'text-indigo-500',
    pink: 'text-pink-500',
    violet: 'text-violet-500',
    amber: 'text-amber-500',
  }[tool.colorClass] || 'text-blue-500';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      id={`tool-card-${tool.id}`}
      className={`relative w-full border rounded-2xl md:p-6 p-5 transition-all shadow-md flex flex-col gap-4 ${
        isDarkMode 
          ? 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60' 
          : 'bg-white border-gray-100 hover:bg-gray-50/50'
      } ${accentGlow}`}
    >
      {/* Top Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl flex items-center justify-center transition-colors ${
            isDarkMode ? 'bg-slate-800/65' : 'bg-gray-50'
          } ${accentText}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight tracking-tight select-none">
              {tool.name}
            </h3>
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {activeLanguage.categories[tool.category]}
            </span>
          </div>
        </div>

        {/* Level & Ratings Badge */}
        <div className="flex flex-col items-end gap-1.5">
          <span className={`px-2.5 py-0.5 border text-[11px] font-bold rounded-full ${skillColor}`}>
            {activeLanguage.filters[tool.skillLevel.toLowerCase() as any] || tool.skillLevel}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold font-mono">{tool.rating}</span>
            <div className="flex">{renderStars(tool.rating)}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
        {tool.description[languageCode]}
      </p>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className={`p-3 rounded-xl border border-dashed text-xs ${
          isDarkMode ? 'bg-slate-950/30 border-slate-800' : 'bg-gray-50/40 border-gray-100'
        }`}>
          <div className="text-gray-400 dark:text-slate-500 font-medium mb-1 flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-500 shrink-0" />
            {activeLanguage.toolCard.pricing}
          </div>
          <div className="font-bold font-mono text-slate-800 dark:text-white flex items-center gap-1">
            {tool.pricing.cost}
            <span className="text-[10px] font-normal opacity-75">
              ({tool.pricing.desc[languageCode]})
            </span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border border-dashed text-xs ${
          isDarkMode ? 'bg-slate-950/30 border-slate-800' : 'bg-gray-50/40 border-gray-100'
        }`}>
          <div className="text-gray-400 dark:text-slate-500 font-medium mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-500 shrink-0" />
            {activeLanguage.toolCard.ease}
          </div>
          <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
            <span className="font-mono">{tool.easeOfUse.rating}/5</span>
            <span className="opacity-75 font-normal text-[10px] truncate-300">
              ({tool.easeOfUse.text[languageCode]})
            </span>
          </div>
        </div>
      </div>

      {/* Expandable detailed lists */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4 border-t pt-4 dark:border-slate-800/80"
        >
          {/* Main Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 flex items-center gap-1.5 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500`} />
              {activeLanguage.toolCard.keyFeatures}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {tool.mainFeatures[languageCode].map((feat, index) => (
                <li key={index} className="text-xs flex items-start gap-1.5 text-gray-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Features Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 flex items-center gap-1.5 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400`} />
              {activeLanguage.toolCard.aiSuperpowers}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.aiFeaturesList[languageCode].map((feat, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 rounded-md text-[10px] font-medium tracking-wide flex items-center gap-1 ${
                    isDarkMode 
                      ? 'bg-slate-950/60 text-cyan-400 border border-slate-800' 
                      : 'bg-cyan-50/50 text-cyan-700 border border-cyan-100'
                  }`}
                >
                  <Sparkles className="w-2.5 h-2.5 shrink-0" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Best Suited Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 flex items-center gap-1.5 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full bg-violet-400`} />
              {activeLanguage.toolCard.bestFor}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.bestUseCases[languageCode].map((useCase, index) => (
                <span 
                  key={index}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700/50' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200/50'
                  }`}
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Card Action footer */}
      <div className="flex items-center justify-between gap-3 mt-auto border-t pt-3 dark:border-slate-800/80">
        <button
          id={`tool-card-expand-btn-${tool.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-1 text-xs font-medium tracking-wide border px-3 py-1.5 rounded-lg transition-all ${
            isDarkMode 
              ? 'border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-white' 
              : 'border-gray-200 text-gray-500 hover:bg-gray-100/50 hover:text-slate-800'
          }`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>More</span>
            </>
          )}
        </button>

        <button
          id={`tool-card-compare-btn-${tool.id}`}
          onClick={() => onCompareToggle(tool.id)}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all ${
            isInComparison
              ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/30'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-500'
          }`}
        >
          {isInComparison ? (
            <>
              <Minus className="w-3.5 h-3.5" />
              <span>{activeLanguage.toolCard.removeCompare}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{activeLanguage.toolCard.compareBtn}</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
