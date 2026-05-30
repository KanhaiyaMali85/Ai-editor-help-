/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 
  | 'video' 
  | 'photo' 
  | 'design' 
  | 'audio' 
  | 'content' 
  | 'social';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Professional';

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface LocalizedStringArray {
  en: string[];
  hi: string[];
}

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: LocalizedText;
  mainFeatures: LocalizedStringArray;
  bestUseCases: LocalizedStringArray;
  skillLevel: SkillLevel;
  pricing: {
    type: 'Free' | 'Freemium' | 'Paid';
    desc: LocalizedText;
    cost: string; // e.g. "$19/mo" or "₹1490/महीना"
  };
  easeOfUse: {
    text: LocalizedText;
    rating: number; // 1-5 stars
  };
  aiCapabilities: {
    text: LocalizedText;
    rating: number; // 1-5 stars
  };
  aiFeaturesList: LocalizedStringArray;
  rating: number; // overall rating
  iconName: string; // name to match Lucide icon
  colorClass: string; // styling color
}

export interface TaskRecommendation {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  bestToolId: string;
  alternativeToolIds: string[];
  steps: LocalizedStringArray;
  pros: LocalizedStringArray;
}

export interface LanguagePack {
  appName: string;
  subtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  categories: {
    video: string;
    photo: string;
    design: string;
    audio: string;
    content: string;
    social: string;
  };
  tabs: {
    directory: string;
    recommendation: string;
    comparison: string;
    learn: string;
  };
  filters: {
    skillLevel: string;
    pricing: string;
    all: string;
    beginner: string;
    intermediate: string;
    professional: string;
    free: string;
    freemium: string;
    paid: string;
  };
  toolCard: {
    keyFeatures: string;
    bestFor: string;
    aiSuperpowers: string;
    skill: string;
    pricing: string;
    ease: string;
    aiPower: string;
    compareBtn: string;
    removeCompare: string;
  };
  recommendation: {
    title: string;
    subtitle: string;
    selectTask: string;
    recommendedCombo: string;
    bestChoice: string;
    alternatives: string;
    howToApply: string;
    prosTitle: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    searchToCompare: string;
    selectPrompt: string;
    statGeneral: string;
    statPrice: string;
    statEase: string;
    statAICapabilities: string;
    statFeatures: string;
    vs: string;
  };
  deviceView: {
    label: string;
    phoneIphone: string;
    phoneAndroid: string;
    desktopWeb: string;
  };
}
