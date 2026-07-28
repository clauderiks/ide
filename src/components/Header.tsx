import React, { useState } from 'react';
import { 
  Terminal, 
  Sliders, 
  Activity, 
  Code2, 
  ShieldCheck, 
  MessageSquare, 
  Sun, 
  Moon, 
  Sparkles, 
  Globe, 
  RefreshCw, 
  Bell,
  Command,
  FileText,
  Github
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cloudSyncing: boolean;
  onOpenAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  theme,
  setTheme,
  cloudSyncing,
  onOpenAlerts,
}) => {
  const t = translations[language] || translations.en;
  const [isGithubAuthed, setIsGithubAuthed] = useState(false);

  const navItems = [
    { id: 'readme', label: t.tabReadme, prefix: '>_', icon: FileText },
    { id: 'terminal', label: t.tabTerminal, prefix: '$_', icon: Terminal },
    { id: 'config', label: t.tabConfig, prefix: '#_', icon: Sliders },
    { id: 'telemetry', label: t.tabTelemetry, prefix: '~_', icon: Activity },
    { id: 'api', label: t.tabApi, prefix: '</>', icon: Code2 },
    { id: 'security', label: t.tabSecurity, prefix: '[S]', icon: ShieldCheck },
    { id: 'community', label: t.tabCommunity, prefix: '//', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-md transition-colors font-mono select-none">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Brand & CLI Prompt */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-none bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            $
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-zinc-500 text-xs hidden sm:inline">usr@local:~$</span>
              <button
                onClick={() => setIsGithubAuthed(!isGithubAuthed)}
                id="github-auth-btn"
                className={`flex items-center space-x-2 px-2.5 py-1 rounded-none text-xs font-mono font-medium border transition ${
                  isGithubAuthed
                    ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-emerald-500 hover:text-white'
                }`}
                title="Connect GitHub Repository Authentication"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isGithubAuthed ? 'GitHub Auth: Connected' : 'Auth GitHub Repo'}
                </span>
                <span className={`w-1.5 h-1.5 rounded-none ${isGithubAuthed ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`}></span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 hidden md:block">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Right Utility Bar - IBM Carbon Sharp Square Style */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Cloud Sync Status */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-none bg-zinc-900/90 text-[11px] font-mono text-zinc-300 border border-zinc-800">
            <RefreshCw className={`w-3 h-3 text-emerald-400 ${cloudSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t.cloudSync}:</span>
            <span className="font-semibold text-emerald-400">
              {cloudSyncing ? t.syncSyncing : t.syncActive}
            </span>
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse"></span>
          </div>

          {/* Extended Settings Toggle Button */}
          <button
            onClick={onOpenAlerts}
            id="extended-settings-btn"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-none bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:border-emerald-500/60 transition border border-zinc-800 text-[11px]"
            title="Mở Cài Đặt Mở Rộng (Extended Settings)"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline font-mono">Cài Đặt Mở Rộng</span>
          </button>

          {/* Email Alert Switcher Button */}
          <button
            onClick={onOpenAlerts}
            id="email-alerts-btn"
            className="p-1.5 rounded-none bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:border-emerald-500/60 transition relative border border-zinc-800"
            title={t.emailAlerts}
          >
            <Bell className="w-3.5 h-3.5 text-zinc-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-none bg-emerald-400"></span>
          </button>

          {/* Language Selector (IBM Carbon Sharp Tabs) */}
          <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-none border border-zinc-800 text-[11px]">
            <Globe className="w-3 h-3 text-zinc-500 mx-1 hidden sm:block" />
            {(['vi', 'en', 'ja', 'es'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                id={`lang-btn-${lang}`}
                className={`px-1.5 py-0.5 rounded-none font-mono font-medium transition ${
                  language === lang
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-none border border-zinc-800 text-[11px]">
            <button
              onClick={() => setTheme('light')}
              id="theme-light-btn"
              className={`p-1 rounded-none transition ${
                theme === 'light' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              id="theme-dark-btn"
              className={`p-1 rounded-none transition ${
                theme === 'dark' ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/50' : 'text-zinc-400 hover:text-white'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('oled')}
              id="theme-oled-btn"
              className={`p-1 rounded-none transition ${
                theme === 'oled' ? 'bg-black text-emerald-400 border border-emerald-400' : 'text-zinc-400 hover:text-white'
              }`}
              title="OLED Glossy Black"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs (Desktop & Tablet Horizontal Strip) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 border-t border-zinc-800/80 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 min-w-max py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-none text-xs font-mono font-medium transition-all border ${
                  isActive
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:bg-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="text-emerald-500/80 font-bold">{item.prefix}</span>
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sticky Quick Dock Bar at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800 px-1 py-1 flex items-center justify-around font-mono">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-none text-[10px] font-mono transition-all border ${
                isActive
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="truncate max-w-[48px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

