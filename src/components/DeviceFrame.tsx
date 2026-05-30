/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Monitor } from 'lucide-react';
import { LanguagePack } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeLanguage: LanguagePack;
  isDarkMode: boolean;
}

export type ViewportMode = 'iphone' | 'android' | 'web';

export default function DeviceFrame({ children, activeLanguage, isDarkMode }: DeviceFrameProps) {
  const [viewport, setViewport] = useState<ViewportMode>('web');

  const containerVariants = {
    web: { width: '100%', height: 'auto', borderRadius: '0px', boxShadow: 'none' },
    iphone: { width: '390px', height: '812px', borderRadius: '44px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' },
    android: { width: '400px', height: '840px', borderRadius: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' },
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen transition-colors duration-300">
      {/* Device Viewport Bar Selector */}
      <div className={`w-full py-3 px-6 flex flex-wrap items-center justify-between border-b gap-3 transition-colors ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {activeLanguage.deviceView.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/80 dark:bg-slate-800/80">
          <button
            id="viewport-btn-iphone"
            onClick={() => setViewport('iphone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              viewport === 'iphone'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {activeLanguage.deviceView.phoneIphone}
          </button>
          <button
            id="viewport-btn-android"
            onClick={() => setViewport('android')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              viewport === 'android'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {activeLanguage.deviceView.phoneAndroid}
          </button>
          <button
            id="viewport-btn-web"
            onClick={() => setViewport('web')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              viewport === 'web'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            {activeLanguage.deviceView.desktopWeb}
          </button>
        </div>
      </div>

      {/* Main Container Workspace */}
      <div className={`flex-1 flex items-center justify-center w-full py-8 px-4 overflow-x-auto ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-slate-800'
      }`}>
        {viewport === 'web' ? (
          <div className="w-full max-w-7xl mx-auto h-full min-h-[70vh]">
            {children}
          </div>
        ) : viewport === 'iphone' ? (
          /* iPhone 15 Pro Hardware Frame simulation */
          <div className="relative p-3.5 bg-slate-800 rounded-[50px] border-[6px] border-slate-700/80 shadow-2xl flex-shrink-0">
            {/* Speaker Ear Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-30" />
            {/* Action Action Button */}
            <div className="absolute top-[130px] -left-1.5 w-1 h-9 bg-slate-700 rounded-r-sm" />
            {/* Volume Up */}
            <div className="absolute top-[180px] -left-1.5 w-1 h-12 bg-slate-700 rounded-r-sm" />
            {/* Volume Down */}
            <div className="absolute top-[236px] -left-1.5 w-1 h-12 bg-slate-700 rounded-r-sm" />
            {/* Power Button */}
            <div className="absolute top-[210px] -right-1.5 w-1 h-16 bg-slate-700 rounded-l-sm" />

            <motion.div
              animate={{ width: '375px', height: '760px' }}
              className="relative overflow-hidden bg-slate-900 rounded-[38px] flex flex-col border border-black/20"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Dynamic Island Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6.5 bg-black rounded-full z-50 flex items-center justify-between px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-radial from-slate-900 to-black border border-slate-800/80" />
              </div>

              {/* iOS Status Bar */}
              <div className="h-10 pt-1.5 px-6 flex items-center justify-between text-[10px] font-bold text-slate-300 select-none z-40 bg-transparent shrink-0">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="opacity-90">5G</span>
                  <div className="w-5 h-2.5 border border-slate-300/60 rounded-sm p-0.5 flex items-center">
                    <div className="h-full w-4/5 bg-slate-300 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* The actual mobile App Layout */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-6 rounded-b-[38px]">
                {children}
              </div>

              {/* Home Indicator bar */}
              <div className="absolute bottom-1 right-0 left-0 h-4 flex items-center justify-center z-40 bg-transparent">
                <div className="w-32 h-1 bg-slate-400/80 rounded-full" />
              </div>
            </motion.div>
          </div>
        ) : (
          /* Android Hardware Frame simulation (Google Pixel Style) */
          <div className="relative p-3 bg-slate-900 rounded-[36px] border-[5px] border-slate-750 shadow-2xl flex-shrink-0">
            {/* Camera Punch Hole */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-slate-800/80 z-50" />
            {/* Power Button */}
            <div className="absolute top-[140px] -right-1 w-1 h-10 bg-slate-800 rounded-l-sm" />
            {/* Volume Keys */}
            <div className="absolute top-[200px] -right-1 w-1 h-16 bg-slate-800 rounded-l-sm" />

            <motion.div
              animate={{ width: '380px', height: '780px' }}
              className="relative overflow-hidden bg-slate-900 rounded-[24px] flex flex-col border border-black/20"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Android Status Bar */}
              <div className="h-8 px-6 flex items-center justify-between text-[10px] font-medium text-slate-300 select-none z-40 bg-transparent shrink-0">
                <span>03:48</span>
                <div className="flex items-center gap-1.5">
                  <span className="opacity-90">LTE</span>
                  <div className="w-3.5 h-3.5 bg-slate-300 rounded-full opacity-80 scale-75" />
                </div>
              </div>

              {/* The actual App Layout */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-6 rounded-b-[24px]">
                {children}
              </div>

              {/* Android Gesture Bar */}
              <div className="absolute bottom-1 right-0 left-0 h-4 flex items-center justify-center z-40 bg-transparent">
                <div className="w-24 h-1 bg-slate-500/80 rounded-full" />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
