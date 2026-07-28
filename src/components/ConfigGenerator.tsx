import React, { useState } from 'react';
import { Sliders, Copy, Check, Download, ShieldCheck, Palette, RefreshCw, Layers } from 'lucide-react';
import { ConfigSettings, Language } from '../types';
import { translations } from '../data/translations';

interface ConfigGeneratorProps {
  language: Language;
}

export const ConfigGenerator: React.FC<ConfigGeneratorProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState<ConfigSettings>({
    primaryColor: '#7C3AED',
    secondaryColor: '#3B82F6',
    accentColor: '#10B981',
    borderStyle: 'rounded',
    refreshInterval: 30,
    previewWidth: 60,
    language: language,
    cloudSyncEnabled: true,
    autoBackupDaily: true,
    require2FAForMerge: true,
    securityPatchAlerts: true,
    showAvatars: true,
    compactView: false,
  });

  const generatedYaml = `# ~/.config/gh-dash/config.yml
# Custom Configuration Matrix generated automatically

theme:
  ui:
    colors:
      primary: "${config.primaryColor}"
      secondary: "${config.secondaryColor}"
      accent: "${config.accentColor}"
  borderStyle: "${config.borderStyle}"

defaults:
  previewWidth: ${config.previewWidth}
  refreshInterval: ${config.refreshInterval} # seconds
  language: "${config.language}"
  showAvatars: ${config.showAvatars}
  compactView: ${config.compactView}

cloudSync:
  enabled: ${config.cloudSyncEnabled}
  autoBackupDaily: ${config.autoBackupDaily}
  encryption: "AES-256"

security:
  require2FAForMerge: ${config.require2FAForMerge}
  securityPatchAlerts: ${config.securityPatchAlerts}

prSections:
  - title: "My Open PRs"
    filters: "is:open author:@me"
  - title: "Review Requested"
    filters: "is:open review-requested:@me"

issueSections:
  - title: "Assigned Issues"
    filters: "is:open assignee:@me"
`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadYaml = () => {
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Interactive Control Panel */}
        <div className="space-y-6">
          <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-6 text-zinc-100">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono pb-3 border-b border-zinc-800">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>{t.tabConfig} — Customizer</span>
            </h3>

            {/* Theme & Colors */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>1. Theme & Color Palette</span>
              </h4>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-7 h-7 rounded-none border border-zinc-700 bg-black cursor-pointer"
                    />
                    <span className="font-mono text-zinc-300 text-[11px]">{config.primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Secondary</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-7 h-7 rounded-none border border-zinc-700 bg-black cursor-pointer"
                    />
                    <span className="font-mono text-zinc-300 text-[11px]">{config.secondaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-7 h-7 rounded-none border border-zinc-700 bg-black cursor-pointer"
                    />
                    <span className="font-mono text-zinc-300 text-[11px]">{config.accentColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Panel Border Style</label>
                <select
                  value={config.borderStyle}
                  onChange={(e) => setConfig({ ...config, borderStyle: e.target.value as any })}
                  className="w-full p-2 text-xs font-mono rounded-none bg-black border border-zinc-800 text-emerald-400 focus:outline-none focus:border-emerald-500"
                >
                  <option value="rounded">rounded (Bo tròn góc)</option>
                  <option value="double">double (Khung viền kép)</option>
                  <option value="normal">normal (Vuông vắn IBM)</option>
                  <option value="none">none (Không viền)</option>
                </select>
              </div>
            </div>

            {/* General Defaults */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>2. Display Defaults</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-zinc-400 mb-1">
                    Refresh Interval: {config.refreshInterval}s
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={config.refreshInterval}
                    onChange={(e) => setConfig({ ...config, refreshInterval: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">
                    Preview Width: {config.previewWidth}%
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    step="5"
                    value={config.previewWidth}
                    onChange={(e) => setConfig({ ...config, previewWidth: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Cloud & Security Settings */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>3. Cloud Sync & Security Parameters</span>
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.cloudSyncEnabled}
                    onChange={(e) => setConfig({ ...config, cloudSyncEnabled: e.target.checked })}
                    className="rounded-none border-zinc-700 bg-black accent-emerald-500"
                  />
                  <span className="text-zinc-300">Enable Cloud Configuration Sync</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoBackupDaily}
                    onChange={(e) => setConfig({ ...config, autoBackupDaily: e.target.checked })}
                    className="rounded-none border-zinc-700 bg-black accent-emerald-500"
                  />
                  <span className="text-zinc-300">Automated Daily Backup to Cloud (00:00 UTC)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.require2FAForMerge}
                    onChange={(e) => setConfig({ ...config, require2FAForMerge: e.target.checked })}
                    className="rounded-none border-zinc-700 bg-black accent-emerald-500"
                  />
                  <span className="text-zinc-300">Mandatory 2FA TOTP Verification for Merge</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.securityPatchAlerts}
                    onChange={(e) => setConfig({ ...config, securityPatchAlerts: e.target.checked })}
                    className="rounded-none border-zinc-700 bg-black accent-emerald-500"
                  />
                  <span className="text-zinc-300">Push & Email Security Patch Alerts</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Generated YAML Preview */}
        <div className="space-y-4">
          <div className="p-5 rounded-none bg-black border border-zinc-800 space-y-4 font-mono text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-2">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generated YAML (~/.config/gh-dash/config.yml)</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyYaml}
                  className="px-2.5 py-1 rounded-none bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 text-xs text-zinc-200 transition flex items-center space-x-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy YAML'}</span>
                </button>
                <button
                  onClick={handleDownloadYaml}
                  className="px-2.5 py-1 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-xs text-white font-bold transition flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <pre className="p-4 bg-zinc-950 rounded-none border border-zinc-800 text-xs text-emerald-400 overflow-x-auto leading-relaxed max-h-[480px]">
              {generatedYaml}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
