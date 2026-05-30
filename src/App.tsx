/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, Languages, Moon, Sun, 
  Sparkles, BookOpen, Layers, Scale, Sparkle, AlertCircle
} from 'lucide-react';

import { TOOLS, TASKS, LANGUAGES } from './data';
import { Category, SkillLevel, Tool } from './types';
import DeviceFrame from './components/DeviceFrame';
import ToolCard from './components/ToolCard';
import RecommendationEngine from './components/RecommendationEngine';
import ComparisonView from './components/ComparisonView';

export default function App() {
  // Localization state
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const activeLanguage = LANGUAGES[language];

  // Theme states
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Tab controls
  const [activeTab, setActiveTab] = useState<'directory' | 'recommendation' | 'comparison' | 'skills'>('directory');

  // Search & Filtering matrices
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [skillFilter, setSkillFilter] = useState<'all' | SkillLevel>('all');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'Free' | 'Freemium' | 'Paid'>('all');

  // Interactive filters panel expanded trigger
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  // Comparison basket
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);

  // Apply dark class to body element for global styled inputs
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Comparison toggle basket logic
  const handleCompareToggle = (toolId: string) => {
    setComparisonIds(prev => {
      let next: string[];
      if (prev.includes(toolId)) {
        next = prev.filter(id => id !== toolId);
      } else {
        // Enforce maximum 2 items in comparison frame
        if (prev.length >= 2) {
          next = [prev[1], toolId];
        } else {
          next = [...prev, toolId];
        }
      }
      return next;
    });

    // Auto-navigate to Comparison Tab if user is adding tools to compare!
    if (!comparisonIds.includes(toolId)) {
      setActiveTab('comparison');
    }
  };

  const handleRemoveComparison = (toolId: string) => {
    setComparisonIds(prev => prev.filter(id => id !== toolId));
  };

  // Switch to tool directory and highlight singular tool
  const handleSelectToolAndInspect = (toolId: string) => {
    setActiveTab('directory');
    const targetTool = TOOLS.find(t => t.id === toolId);
    if (targetTool) {
      setSelectedCategory('all');
      setSearchQuery(targetTool.name);
      // Clean filters to expose target
      setSkillFilter('all');
      setPricingFilter('all');
      
      // Auto-scroll target element into view smoothly after high-priority transition
      setTimeout(() => {
        const item = document.getElementById(`tool-card-${toolId}`);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
          item.classList.add('ring-2', 'ring-indigo-500/50');
          setTimeout(() => {
            item.classList.remove('ring-2', 'ring-indigo-500/50');
          }, 2000);
        }
      }, 300);
    }
  };

  // Filter tools database
  const filteredTools = TOOLS.filter(tool => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }
    // 2. Skill Filter
    if (skillFilter !== 'all' && tool.skillLevel !== skillFilter) {
      return false;
    }
    // 3. Pricing Filter
    if (pricingFilter !== 'all') {
      if (pricingFilter === 'Free' && tool.pricing.type !== 'Free') return false;
      if (pricingFilter === 'Freemium' && tool.pricing.type !== 'Freemium') return false;
      if (pricingFilter === 'Paid' && tool.pricing.type !== 'Paid') return false;
    }
    // 4. Search text match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = tool.name.toLowerCase().includes(q);
      const matchDesc = tool.description[language].toLowerCase().includes(q);
      const matchFeatures = tool.mainFeatures[language].some(f => f.toLowerCase().includes(q));
      const matchSuited = tool.bestUseCases[language].some(u => u.toLowerCase().includes(q));
      
      if (!matchName && !matchDesc && !matchFeatures && !matchSuited) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-slate-800'}`}>
      <DeviceFrame activeLanguage={activeLanguage} isDarkMode={isDarkMode}>
        {/* Inside Native App Scroll Container */}
        <div className={`w-full flex flex-col min-h-full ${
          isDarkMode ? 'bg-slate-950/80' : 'bg-white'
        }`} id="app-container">
          
          {/* Header Bar */}
          <header className={`py-5 px-5 border-b sticky top-0 backdrop-blur-md z-30 transition-all ${
            isDarkMode ? 'bg-slate-950/90 border-slate-900' : 'bg-white/90 border-gray-100'
          }`}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-500">
                  <Sparkles className="w-5 h-5 shrink-0" />
                </div>
                <h1 className="font-extrabold text-base tracking-tight leading-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
                  {activeLanguage.appName}
                </h1>
              </div>
              
              {/* Toggles bar */}
              <div className="flex items-center gap-2">
                {/* Hindi/English Toggle */}
                <button
                  id="lang-toggle-btn"
                  onClick={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border ${
                    isDarkMode 
                      ? 'border-slate-800 hover:bg-slate-900 bg-slate-950 text-indigo-400' 
                      : 'border-gray-200 hover:bg-gray-100 bg-gray-50 text-indigo-600 shadow-xs'
                  }`}
                  title="Switch Language / भाषा बदलें"
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-extrabold font-mono uppercase ml-1">{language}</span>
                </button>

                {/* Dark/Light mode Toggle */}
                <button
                  id="theme-toggle-btn"
                  onClick={() => setIsDarkMode(prev => !prev)}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border ${
                    isDarkMode 
                      ? 'border-slate-800 hover:bg-slate-900 bg-slate-950 text-amber-400' 
                      : 'border-gray-200 hover:bg-gray-100 bg-gray-50 text-slate-700 shadow-xs'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
                </button>
              </div>
            </div>
            <p className={`text-[11px] font-semibold tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {activeLanguage.subtitle}
            </p>
          </header>

          {/* Navigation Tab Menu */}
          <nav className={`px-4 py-2 border-b flex items-center justify-between overflow-x-auto no-scrollbar gap-1 ${
            isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-gray-50/55 border-gray-100'
          }`}>
            <button
              id="tab-btn-directory"
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-150/45 dark:hover:bg-slate-900/60'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>{activeLanguage.tabs.directory}</span>
            </button>

            <button
              id="tab-btn-recommendation"
              onClick={() => { setActiveTab('recommendation'); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'recommendation'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-150/45 dark:hover:bg-slate-900/60'
              }`}
            >
              <Sparkle className="w-4 h-4 shrink-0" />
              <span>{activeLanguage.tabs.recommendation}</span>
            </button>

            <button
              id="tab-btn-comparison"
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                activeTab === 'comparison'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-150/45 dark:hover:bg-slate-900/60'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>{activeLanguage.tabs.comparison}</span>
              {comparisonIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                  {comparisonIds.length}
                </span>
              )}
            </button>

            <button
              id="tab-btn-skills"
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-150/45 dark:hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{activeLanguage.tabs.learn}</span>
            </button>
          </nav>

          {/* Core Content Body with Transition Area */}
          <main className="flex-1 p-5 overflow-y-auto flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {activeTab === 'directory' && (
                <motion.div
                  key="tab-directory"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-6"
                >
                  {/* Filters and Search segment */}
                  <div className="flex flex-col gap-3">
                    {/* Search Field */}
                    <div className="relative w-full">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        id="search-input"
                        type="text"
                        placeholder={activeLanguage.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm font-semibold focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-900/60 border-slate-800 text-white placeholder-slate-500' 
                            : 'bg-white border-gray-150 text-gray-800 placeholder-gray-400'
                        }`}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-200 text-xs font-black uppercase font-mono px-1"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Horizontal Categories Row */}
                    <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 py-1">
                      <button
                        id="category-btn-all"
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3.5 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${
                          selectedCategory === 'all'
                            ? 'bg-slate-800 border-slate-800 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900 font-extrabold shadow-xs'
                            : isDarkMode
                              ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-55/40'
                        }`}
                      >
                        {activeLanguage.allCategories}
                      </button>
                      {(['video', 'photo', 'design', 'audio', 'content', 'social'] as Category[]).map(cat => (
                        <button
                          key={cat}
                          id={`category-btn-${cat}`}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3.5 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${
                            selectedCategory === cat
                              ? 'bg-slate-800 border-slate-800 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900 font-extrabold shadow-xs'
                              : isDarkMode
                                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-55/40'
                          }`}
                        >
                          {activeLanguage.categories[cat]}
                        </button>
                      ))}
                    </div>

                    {/* Expand/Collapse Custom Filters Button */}
                    <div className="flex justify-end">
                      <button
                        id="expand-filters-btn"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-wider cursor-pointer ${
                          isDarkMode ? 'text-slate-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-600'
                        }`}
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                        <span>Filter Matrix</span>
                      </button>
                    </div>

                    {/* Expanded Filters panel */}
                    {filtersOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 justify-between transition-colors ${
                          isDarkMode ? 'bg-slate-900/40 border-slate-850' : 'bg-gray-50 border-gray-100'
                        }`}
                      >
                        {/* Skill filter */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                            {activeLanguage.filters.skillLevel}
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {['all', 'Beginner', 'Intermediate', 'Professional'].map((level) => (
                              <button
                                key={level}
                                id={`filter-skill-${level}`}
                                onClick={() => setSkillFilter(level as any)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                  skillFilter === level
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : isDarkMode
                                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {activeLanguage.filters[level.toLowerCase() as any] || level}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Pricing filter */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                            {activeLanguage.filters.pricing}
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {['all', 'Free', 'Freemium', 'Paid'].map((tier) => (
                              <button
                                key={tier}
                                id={`filter-price-${tier}`}
                                onClick={() => setPricingFilter(tier as any)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                  pricingFilter === tier
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : isDarkMode
                                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {activeLanguage.filters[tier.toLowerCase() as any] || tier}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Empty state or Directory Grid list */}
                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
                      {filteredTools.map(tool => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          activeLanguage={activeLanguage}
                          languageCode={language}
                          isDarkMode={isDarkMode}
                          onCompareToggle={handleCompareToggle}
                          isInComparison={comparisonIds.includes(tool.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={`p-12 border border-dashed rounded-3xl flex flex-col items-center justify-center text-center gap-3 transition-colors ${
                      isDarkMode ? 'bg-slate-900/10 border-slate-800' : 'bg-gray-55/35 border-gray-200'
                    }`}>
                      <AlertCircle className="w-10 h-10 text-gray-400 animate-pulse" />
                      <h4 className="font-bold text-sm tracking-tight">No AI Tools found</h4>
                      <p className="text-xs text-gray-500 max-w-sm">
                        Try modifying your search query or filters to discover matching platforms.
                      </p>
                      <button
                        id="reset-filters-btn"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSkillFilter('all');
                          setPricingFilter('all');
                        }}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                      >
                        Reset All Matrix Filters
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'recommendation' && (
                <motion.div
                  key="tab-recommendation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <RecommendationEngine
                    tasks={TASKS}
                    tools={TOOLS}
                    activeLanguage={activeLanguage}
                    languageCode={language}
                    isDarkMode={isDarkMode}
                    onSelectTool={handleSelectToolAndInspect}
                  />
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div
                  key="tab-comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ComparisonView
                    tools={TOOLS}
                    activeLanguage={activeLanguage}
                    languageCode={language}
                    isDarkMode={isDarkMode}
                    preSelectedToolIds={comparisonIds}
                    onRemovePreselection={handleRemoveComparison}
                  />
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="tab-skills"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-6"
                >
                  {/* Skills educational guides panel */}
                  <div className="text-center md:max-w-2xl mx-auto flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2 select-none">
                      <BookOpen className="w-6 h-6 text-indigo-500" />
                      {language === 'en' ? 'Creator Skills Index' : 'क्रिएटर कौशल सूचकांक'}
                    </h2>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      {language === 'en' 
                        ? 'Master key technical skills with built-in AI modules' 
                        : 'इन-बिल्ट एआई मॉड्यूल के साथ प्रमुख तकनीकी कौशल में महारत हासिल करें'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Course 1 */}
                    <div className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                      isDarkMode ? 'bg-slate-900/35 border-slate-800' : 'bg-white border-gray-150 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-500">
                        <Sparkle className="w-4.5 h-4.5" />
                        <h3 className="font-bold text-sm">
                          {language === 'en' ? 'Prompt Engineering for Graphics' : 'ग्राफिक्स के लिए प्रॉम्ट इंजीनियरिंग'}
                        </h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {language === 'en'
                          ? 'Learn how to structuralise negative prompts, visual style rules, and ratio settings inside tools like Adobe Photoshop and Canva to compose immaculate, click-worthy assets.'
                          : 'सीखें कि एडोब फोटोशॉप और कैनवा जैसे उपकरणों के अंदर रचनात्मक और बेदाग कलाकृतियां बनाने के लिए नकारात्मक संकेत (negative prompts), विज़ुअल शैली नियम और अनुपात सेटिंग्स को कैसे व्यवस्थित करें।'}
                      </p>
                    </div>

                    {/* Course 2 */}
                    <div className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                      isDarkMode ? 'bg-slate-900/35 border-slate-800' : 'bg-white border-gray-150 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-500">
                        <Sparkle className="w-4.5 h-4.5" />
                        <h3 className="font-bold text-sm">
                          {language === 'en' ? 'AI Voice Over & Audio Cleansing' : 'एआई वॉयस ओवर और ऑडियो क्लीनअप'}
                        </h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {language === 'en'
                          ? 'Understand voice training algorithms. Clean dynamic humming waveforms, synthesize authentic overdub files, and manage background volume dips perfectly using Descript.'
                          : 'वॉयस ट्रेनिंग एल्गोरिदम को समझें। डेस्क्रिप्ट का उपयोग करके पृष्ठभूमि की गूंज हटाना, प्रामाणिक वॉयस ओवरडब फाइलों का निर्माण और वॉल्यूम डिप्स को पूरी तरह से प्रबंधित करना सीखें।'}
                      </p>
                    </div>

                    {/* Course 3 */}
                    <div className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                      isDarkMode ? 'bg-slate-900/35 border-slate-800' : 'bg-white border-gray-150 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-500">
                        <Sparkle className="w-4.5 h-4.5" />
                        <h3 className="font-bold text-sm">
                          {language === 'en' ? 'Automated Motion Workflows' : 'स्वचालित मोशन वर्कफ़्लो'}
                        </h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {language === 'en'
                          ? 'Leverage Premiere Pro to automate transcription and aspect ratios to repurposing raw 16:9 cinematic footage into optimized vertical 9:16 mobile feeds instantly.'
                          : 'प्रीमियर प्रो के उपयोग से ऑटो-कैप्शनिंग और ऑटो-रीफ्रेमिंग का लाभ उठाकर सामान्य परिदृश्य फिल्मों को मोबाइल-सुलभ लंबवत (vertical 9:16) प्रारूपों में तेजी से बदलें।'}
                      </p>
                    </div>

                    {/* Course 4 */}
                    <div className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                      isDarkMode ? 'bg-slate-900/35 border-slate-800' : 'bg-white border-gray-150 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-500">
                        <Sparkle className="w-4.5 h-4.5" />
                        <h3 className="font-bold text-sm">
                          {language === 'en' ? 'Generative Kinetic Inpainting' : 'जनरेटिव काइनेटिक इनपेंटिंग'}
                        </h3>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {language === 'en'
                          ? 'Master advanced motion tracking inside Runway and DaVinci Resolve. Swap moving cars, change sky scenery, and paint custom objects dynamically on fluid timelines.'
                          : 'रनवे और डाविंची रिज़ॉल्यूशन के भीतर उन्नत मोशन ट्रैकिंग में महारत हासिल करें। गतिशील रूप से चलती कारों को बदलना, आकाश के दृश्य को बदलना और नई चीजें जोड़ना आसान बनाएं।'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Persistent Footer */}
          <footer className={`py-4 px-5 border-t text-center text-[10px] mt-auto font-medium transition-colors ${
            isDarkMode ? 'bg-slate-950/80 border-slate-900 text-slate-500' : 'bg-gray-50 border-gray-100 text-gray-400'
          }`}>
            <span>© 2026 {activeLanguage.appName}. Crafted for Designers & Content Creators.</span>
          </footer>

        </div>
      </DeviceFrame>
    </div>
  );
}
