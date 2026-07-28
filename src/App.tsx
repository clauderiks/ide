/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReadmeViewer } from './components/ReadmeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ConfigGenerator } from './components/ConfigGenerator';
import { TelemetryDashboard } from './components/TelemetryDashboard';
import { ApiSandbox } from './components/ApiSandbox';
import { SecurityAndBackup } from './components/SecurityAndBackup';
import { CommunityForum } from './components/CommunityForum';
import { PreferencesModal } from './components/PreferencesModal';
import { Language, ThemeMode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('readme');
  const [language, setLanguage] = useState<Language>('vi');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  // Apply theme class to document body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'oled');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'oled') {
      root.classList.add('dark', 'oled');
    }
  }, [theme]);

  // Periodic cloud sync effect simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudSyncing(true);
      setTimeout(() => setCloudSyncing(false), 1500);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ibm-grid-bg transition-colors duration-200 ${
      theme === 'oled'
        ? 'bg-black text-zinc-100'
        : theme === 'dark'
        ? 'bg-zinc-950 text-zinc-100'
        : 'bg-zinc-950 text-zinc-100'
    }`}>
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        cloudSyncing={cloudSyncing}
        onOpenAlerts={() => setAlertsOpen(true)}
      />

      {/* Main Content Body */}
      <main className="pb-24 md:pb-16">
        {activeTab === 'readme' && <ReadmeViewer language={language} />}
        {activeTab === 'terminal' && <TerminalSimulator />}
        {activeTab === 'config' && <ConfigGenerator language={language} />}
        {activeTab === 'telemetry' && <TelemetryDashboard language={language} />}
        {activeTab === 'api' && <ApiSandbox language={language} />}
        {activeTab === 'security' && <SecurityAndBackup language={language} />}
        {activeTab === 'community' && <CommunityForum language={language} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 bg-black/90 backdrop-blur-sm text-center text-xs font-mono text-zinc-500 mb-12 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            gh-dash v4.12.0 • Minimalist Terminal Dashboard for GitHub [IBM Carbon UI]
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/dlvhdr/gh-dash" target="_blank" rel="noreferrer" className="hover:underline text-emerald-400">
              GitHub Repository
            </a>
            <span>•</span>
            <a href="https://www.gh-dash.dev/" target="_blank" rel="noreferrer" className="hover:underline text-emerald-400">
              Official gh-dash Website
            </a>
          </div>
        </div>
      </footer>

      {/* Email / Push Alerts Preferences Modal */}
      <PreferencesModal
        isOpen={alertsOpen}
        onClose={() => setAlertsOpen(false)}
      />
    </div>
  );
}
