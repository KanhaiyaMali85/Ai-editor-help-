/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, DollarSign, Sliders, Play, Award, 
  X, Check, Scale, ThumbsUp, Star
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { Tool, LanguagePack } from '../types';

interface ComparisonViewProps {
  tools: Tool[];
  activeLanguage: LanguagePack;
  languageCode: 'en' | 'hi';
  isDarkMode: boolean;
  preSelectedToolIds: string[];
  onRemovePreselection: (toolId: string) => void;
}

export default function ComparisonView({
  tools,
  activeLanguage,
  languageCode,
  isDarkMode,
  preSelectedToolIds,
  onRemovePreselection
}: ComparisonViewProps) {
  const [toolIdA, setToolIdA] = useState<string>('');
  const [toolIdB, setToolIdB] = useState<string>('');

  // Auto-sync tool options when parent selection triggers
  useEffect(() => {
    if (preSelectedToolIds.length > 0) {
      if (preSelectedToolIds[0]) setToolIdA(preSelectedToolIds[0]);
      if (preSelectedToolIds[1]) {
        setToolIdB(preSelectedToolIds[1]);
      } else if (toolIdA === preSelectedToolIds[0]) {
        // Keep prior B or shift
      }
    }
  }, [preSelectedToolIds]);

  const toolA = tools.find(t => t.id === toolIdA);
  const toolB = tools.find(t => t.id === toolIdB);

  const availableA = tools.filter(t => t.id !== toolIdB);
  const availableB = tools.filter(t => t.id !== toolIdA);

  const getAffordabilityRating = (tool: Tool): number => {
    if (tool.pricing.type === 'Free') return 5;
    if (tool.pricing.type === 'Freemium') return 4;
    return 2; // Paid
  };

  const metricLabels = {
    aiPower: languageCode === 'hi' ? 'एआई पावर' : 'AI Power',
    easeOfUse: languageCode === 'hi' ? 'उपयोग में आसानी' : 'Ease of Use',
    affordability: languageCode === 'hi' ? 'वहनीयता' : 'Affordability',
  };

  const chartData = toolA && toolB ? [
    {
      subject: metricLabels.aiPower,
      [toolA.name]: toolA.aiCapabilities.rating,
      [toolB.name]: toolB.aiCapabilities.rating,
      fullMark: 5,
    },
    {
      subject: metricLabels.easeOfUse,
      [toolA.name]: toolA.easeOfUse.rating,
      [toolB.name]: toolB.easeOfUse.rating,
      fullMark: 5,
    },
    {
      subject: metricLabels.affordability,
      [toolA.name]: getAffordabilityRating(toolA),
      [toolB.name]: getAffordabilityRating(toolB),
      fullMark: 5,
    },
  ] : [];

  const getSkillColor = (level: string) => {
    return {
      Beginner: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      Intermediate: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      Professional: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    }[level] || '';
  };

  const getEaseBadge = (val: number) => {
    if (val >= 4.5) return 'Easy-peasy ⚡';
    if (val >= 3) return 'Comfortable 👍';
    return 'Demanding 🌋';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 shrink-0 ${
              i < Math.round(rating) 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-gray-300 dark:text-slate-700'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6" id="comparison-view">
      {/* Intro text */}
      <div className="text-center md:max-w-2xl mx-auto flex flex-col gap-2">
        <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2 select-none">
          <Scale className="w-6 h-6 text-emerald-500" />
          {activeLanguage.comparison.title}
        </h2>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          {activeLanguage.comparison.subtitle}
        </p>
      </div>

      {/* Selectors layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Selector A */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Tool A:
          </label>
          <div className="relative">
            <select
              id="select-tool-a"
              value={toolIdA}
              onChange={(e) => {
                setToolIdA(e.target.value);
                onRemovePreselection(toolIdA);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-white' 
                  : 'bg-white border-gray-100 text-gray-700'
              }`}
            >
              <option value="">{activeLanguage.comparison.searchToCompare}</option>
              {availableA.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({activeLanguage.categories[t.category]})</option>
              ))}
            </select>
            {toolIdA && (
              <button 
                onClick={() => { setToolIdA(''); onRemovePreselection(toolIdA); }}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Selector B */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Tool B:
          </label>
          <div className="relative">
            <select
              id="select-tool-b"
              value={toolIdB}
              onChange={(e) => {
                setToolIdB(e.target.value);
                onRemovePreselection(toolIdB);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-white' 
                  : 'bg-white border-gray-100 text-gray-700'
              }`}
            >
              <option value="">{activeLanguage.comparison.searchToCompare}</option>
              {availableB.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({activeLanguage.categories[t.category]})</option>
              ))}
            </select>
            {toolIdB && (
              <button 
                onClick={() => { setToolIdB(''); onRemovePreselection(toolIdB); }}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {toolA && toolB ? (
        <div className="flex flex-col gap-6">
          {/* Radar Chart Component */}
          <div className={`p-6 border rounded-2xl shadow-xl ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800/85 text-white' 
              : 'bg-white border-gray-100 text-gray-800'
          }`}>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 select-none">
              <Award className="w-5 h-5 text-indigo-500 animate-pulse" />
              {languageCode === 'hi' ? 'विशेषता तुलना चार्ट (Radar)' : 'Capabilities & Pricing Comparison'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Radar Chart Container */}
              <div className="md:col-span-2 h-[280px] w-full flex items-center justify-center relative bg-slate-500/5 rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#475569', fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 5]} 
                      tickCount={6}
                      tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 9 }}
                    />
                    <Radar 
                      name={toolA.name} 
                      dataKey={toolA.name} 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.2} 
                    />
                    <Radar 
                      name={toolB.name} 
                      dataKey={toolB.name} 
                      stroke="#06b6d4" 
                      fill="#06b6d4" 
                      fillOpacity={0.2} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        color: isDarkMode ? '#f8fafc' : '#0f172a'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Summary Column */}
              <div className="flex flex-col gap-4">
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
                      {toolA.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">AI Power</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{toolA.aiCapabilities.rating}/5</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">Ease</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{toolA.easeOfUse.rating}/5</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">Price</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{getAffordabilityRating(toolA)}/5</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
                      {toolB.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">AI Power</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{toolB.aiCapabilities.rating}/5</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">Ease</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{toolB.easeOfUse.rating}/5</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase">Price</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{getAffordabilityRating(toolB)}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className={`border rounded-2xl overflow-hidden shadow-xl ${
          isDarkMode ? 'bg-slate-900/30 border-slate-800/85' : 'bg-white border-gray-100'
        }`}>
          {/* Top header row */}
          <div className="grid grid-cols-3 border-b dark:border-slate-800">
            <div className={`p-4 font-bold flex items-center justify-center text-xs dark:bg-slate-950/20 bg-gray-50/50 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              VS Matrix
            </div>
            <div className="p-5 flex flex-col gap-1 items-center border-l dark:border-slate-800">
              <span className="font-mono text-[10px] text-emerald-500 uppercase font-black tracking-wide">A</span>
              <span className="font-extrabold text-base text-center line-clamp-1">{toolA.name}</span>
            </div>
            <div className="p-5 flex flex-col gap-1 items-center border-l dark:border-slate-800">
              <span className="font-mono text-[10px] text-cyan-500 uppercase font-black tracking-wide">B</span>
              <span className="font-extrabold text-base text-center line-clamp-1">{toolB.name}</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col divide-y dark:divide-slate-800">
            {/* Category */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                Category
              </div>
              <div className="p-4 border-l font-semibold text-center text-sm dark:border-slate-800">
                {activeLanguage.categories[toolA.category]}
              </div>
              <div className="p-4 border-l font-semibold text-center text-sm dark:border-slate-800">
                {activeLanguage.categories[toolB.category]}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                Overview
              </div>
              <div className="p-4 border-l text-xs leading-relaxed dark:border-slate-800 text-gray-600 dark:text-slate-350">
                {toolA.description[languageCode]}
              </div>
              <div className="p-4 border-l text-xs leading-relaxed dark:border-slate-800 text-gray-600 dark:text-slate-350">
                {toolB.description[languageCode]}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                Rating
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-1 leading-normal dark:border-slate-800">
                <span className="font-mono font-bold text-base text-slate-800 dark:text-white">{toolA.rating} / 5</span>
                {renderStars(toolA.rating)}
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-1 leading-normal dark:border-slate-800">
                <span className="font-mono font-bold text-base text-slate-800 dark:text-white">{toolB.rating} / 5</span>
                {renderStars(toolB.rating)}
              </div>
            </div>

            {/* Price Plan */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                Cost
              </div>
              <div className="p-4 border-l flex flex-col items-center text-center gap-0.5 dark:border-slate-800">
                <span className="font-extrabold text-sm">{toolA.pricing.cost}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                  {toolA.pricing.desc[languageCode]}
                </span>
              </div>
              <div className="p-4 border-l flex flex-col items-center text-center gap-0.5 dark:border-slate-800">
                <span className="font-extrabold text-sm">{toolB.pricing.cost}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                  {toolB.pricing.desc[languageCode]}
                </span>
              </div>
            </div>

            {/* Ease Rating */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex flex-col justify-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                <span>{activeLanguage.comparison.statEase}</span>
                <span className="font-mono text-[9px] font-normal leading-none lowercase tracking-normal text-slate-500 dark:text-slate-400">
                  higher is easier
                </span>
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-2 dark:border-slate-800">
                <div className="flex items-center gap-1.5 font-bold font-mono text-sm">
                  <span>{toolA.easeOfUse.rating}/5</span>
                  {toolA.easeOfUse.rating >= 4 ? (
                    <ThumbsUp className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : null}
                </div>
                {/* Custom layout line gauge */}
                <div className="w-24 h-1.5 bg-gray-150 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${(toolA.easeOfUse.rating / 5) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-center text-gray-500 dark:text-slate-400 line-clamp-1">
                  {toolA.easeOfUse.text[languageCode]}
                </span>
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-2 dark:border-slate-800">
                <div className="flex items-center gap-1.5 font-bold font-mono text-sm">
                  <span>{toolB.easeOfUse.rating}/5</span>
                  {toolB.easeOfUse.rating >= 4 ? (
                    <ThumbsUp className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : null}
                </div>
                <div className="w-24 h-1.5 bg-gray-150 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${(toolB.easeOfUse.rating / 5) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-center text-gray-500 dark:text-slate-400 line-clamp-1">
                  {toolB.easeOfUse.text[languageCode]}
                </span>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                {activeLanguage.comparison.statAICapabilities}
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-2 dark:border-slate-800">
                <span className="font-semibold text-sm font-mono text-indigo-500 dark:text-indigo-400">
                  {toolA.aiCapabilities.rating}/5
                </span>
                <div className="w-24 h-1.5 bg-gray-150 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${(toolA.aiCapabilities.rating / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-center leading-relaxed text-gray-500 dark:text-slate-400">
                  {toolA.aiCapabilities.text[languageCode]}
                </p>
              </div>
              <div className="p-4 border-l flex flex-col items-center gap-2 dark:border-slate-800">
                <span className="font-semibold text-sm font-mono text-indigo-500 dark:text-indigo-400">
                  {toolB.aiCapabilities.rating}/5
                </span>
                <div className="w-24 h-1.5 bg-gray-150 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${(toolB.aiCapabilities.rating / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-center leading-relaxed text-gray-500 dark:text-slate-400">
                  {toolB.aiCapabilities.text[languageCode]}
                </p>
              </div>
            </div>

            {/* Superpowers */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                AI Tech Features
              </div>
              <div className="p-4 border-l dark:border-slate-800 flex flex-wrap gap-1 items-start justify-center content-start">
                {toolA.aiFeaturesList[languageCode].map((feat, index) => (
                  <span 
                    key={index}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 border border-indigo-500/25 dark:text-indigo-400"
                  >
                    {feat}
                  </span>
                ))}
              </div>
              <div className="p-4 border-l dark:border-slate-800 flex flex-wrap gap-1 items-start justify-center content-start">
                {toolB.aiFeaturesList[languageCode].map((feat, index) => (
                  <span 
                    key={index}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 border border-cyan-500/25 dark:text-cyan-400"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="grid grid-cols-3">
              <div className="p-4 flex items-center font-bold text-xs text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-normal">
                Skill Target
              </div>
              <div className="p-4 border-l flex justify-center items-center dark:border-slate-800">
                <span className={`px-2.5 py-0.5 border text-xs font-semibold rounded-full ${getSkillColor(toolA.skillLevel)}`}>
                  {activeLanguage.filters[toolA.skillLevel.toLowerCase() as any]}
                </span>
              </div>
              <div className="p-4 border-l flex justify-center items-center dark:border-slate-800">
                <span className={`px-2.5 py-0.5 border text-xs font-semibold rounded-full ${getSkillColor(toolB.skillLevel)}`}>
                  {activeLanguage.filters[toolB.skillLevel.toLowerCase() as any]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        /* Empty Picker Interface state */
        <div className={`p-8 rounded-2xl border border-dashed flex flex-col items-center text-center gap-3 ${
          isDarkMode ? 'bg-slate-900/15 border-slate-800' : 'bg-gray-50 border-gray-200'
        }`}>
          <Scale className="w-10 h-10 text-gray-400 animate-pulse" />
          <h4 className="font-bold text-sm select-none">{activeLanguage.comparison.selectPrompt}</h4>
          <p className="text-xs text-gray-500 max-w-sm">
            Quickly match skill requirements, AI smart layers and subscription plans to pick your master ecosystem tools.
          </p>
        </div>
      )}
    </div>
  );
}
