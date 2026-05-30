/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, ArrowRight, Sparkles, Sliders, Play, Award, HelpCircle,
  HelpCircleIcon, Video, Smartphone, Image as ImageIcon, Palette, Mic, Camera
} from 'lucide-react';
import { TaskRecommendation, Tool, LanguagePack } from '../types';

interface RecommendationEngineProps {
  tasks: TaskRecommendation[];
  tools: Tool[];
  activeLanguage: LanguagePack;
  languageCode: 'en' | 'hi';
  isDarkMode: boolean;
  onSelectTool: (toolId: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
  'remove-bg': ImageIcon,
  'generate-subtitles': Mic,
  'color-grading': Sliders,
  'voice-cleanup': Mic,
  'thumbnail-design': Palette,
  'image-upscale': ImageIcon
};

export default function RecommendationEngine({
  tasks,
  tools,
  activeLanguage,
  languageCode,
  isDarkMode,
  onSelectTool,
}: RecommendationEngineProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id || '');

  const activeTask = tasks.find(t => t.id === selectedTaskId);
  const bestTool = tools.find(t => t.id === activeTask?.bestToolId);
  const alternativeTools = tools.filter(t => activeTask?.alternativeToolIds.includes(t.id));

  return (
    <div className="w-full flex flex-col gap-6" id="recommendation-engine">
      {/* Introduction text */}
      <div className="text-center md:max-w-2xl mx-auto flex flex-col gap-2">
        <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2 select-none">
          <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
          {activeLanguage.recommendation.title}
        </h2>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          {activeLanguage.recommendation.subtitle}
        </p>
      </div>

      {/* Task pills selectors */}
      <div className="flex flex-col gap-2">
        <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          {activeLanguage.recommendation.selectTask}
        </span>
        <div className="flex flex-wrap gap-2">
          {tasks.map(task => {
            const TaskIcon = CATEGORY_ICONS[task.id] || Sparkles;
            const isSelected = task.id === selectedTaskId;
            return (
              <button
                key={task.id}
                id={`task-btn-${task.id}`}
                onClick={() => setSelectedTaskId(task.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold select-none transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                    : isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <TaskIcon className="w-4 h-4 shrink-0" />
                <span>{task.name[languageCode]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workflow content card */}
      <AnimatePresence mode="wait">
        {activeTask && bestTool && (
          <motion.div
            key={activeTask.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`border rounded-2xl md:p-6 p-5 shadow-lg flex flex-col gap-6 ${
              isDarkMode ? 'bg-slate-900/35 border-slate-800/80' : 'bg-white border-gray-100'
            }`}
          >
            {/* Top Task summary */}
            <div className="flex flex-col gap-1 boder-b pb-4 dark:border-slate-800/80">
              <h3 className="font-extrabold text-xl font-sans tracking-tight text-indigo-600 dark:text-indigo-400">
                {activeTask.name[languageCode]}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                {activeTask.description[languageCode]}
              </p>
            </div>

            {/* Core Recommendation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Recommended Choice & Alternatives */}
              <div className="flex flex-col gap-4">
                {/* Winner badge */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {activeLanguage.recommendation.bestChoice}
                  </h4>
                  <div
                    onClick={() => onSelectTool(bestTool.id)}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer group transition-all ${
                      isDarkMode 
                        ? 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60' 
                        : 'bg-indigo-50/20 border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-indigo-500/10 text-indigo-500`}>
                        <Sparkles className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <span className="font-bold text-sm block group-hover:text-indigo-500 transition-colors">
                          {bestTool.name}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-slate-400">
                          {bestTool.pricing.cost} • {activeLanguage.filters[bestTool.skillLevel.toLowerCase() as any]}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all shrink-0" />
                  </div>
                </div>

                {/* Alternatives List */}
                {alternativeTools.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">
                      {activeLanguage.recommendation.alternatives}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {alternativeTools.map(alt => (
                        <div
                          key={alt.id}
                          onClick={() => onSelectTool(alt.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                            isDarkMode 
                              ? 'bg-slate-950/30 border-slate-850 hover:bg-slate-900/40 hover:border-slate-750' 
                              : 'bg-gray-50/50 border-gray-100 hover:bg-gray-100/40 hover:border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                            <div>
                              <span className="font-semibold block">{alt.name}</span>
                              <span className="text-[10px] text-gray-500 dark:text-slate-400">
                                {alt.pricing.cost} • {activeLanguage.filters[alt.skillLevel.toLowerCase() as any]}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pros Checklist */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">
                    {activeLanguage.recommendation.prosTitle}
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {activeTask.pros[languageCode].map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-350">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Steps to execute */}
              <div className={`p-5 rounded-2xl flex flex-col gap-4 border ${
                isDarkMode ? 'bg-slate-950/20 border-slate-850' : 'bg-indigo-50/10 border-indigo-50'
              }`}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-indigo-500" />
                  {activeLanguage.recommendation.howToApply}
                </h4>

                <div className="flex flex-col gap-3">
                  {activeTask.steps[languageCode].map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
