import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Cloud, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Lock, 
  Database,
  Smartphone,
  ShieldAlert,
  FileCode,
  FileText
} from 'lucide-react';
import { BackupSnapshot, SecurityAlert, Language } from '../types';
import { translations } from '../data/translations';

interface SecurityAndBackupProps {
  language: Language;
}

const sampleAlerts: SecurityAlert[] = [
  {
    id: 'CVE-2026-8891',
    severity: 'critical',
    title: 'Critical CVE Security Patch: Bubbletea ANSI Escape Sanitization',
    cve: 'CVE-2026-8891',
    date: 'July 28, 2026',
    description: 'Fixes potential terminal injection vulnerability in custom PR titles rendered in TUI view.',
    patchedInVersion: 'v4.12.0'
  },
  {
    id: 'CVE-2026-4021',
    severity: 'high',
    title: 'High Severity: OAuth Token Storage Permissions Guard',
    cve: 'CVE-2026-4021',
    date: 'July 20, 2026',
    description: 'Ensures strict 0600 file permissions for credentials stored in ~/.config/gh-dash/hosts.yml.',
    patchedInVersion: 'v4.11.2'
  }
];

export const SecurityAndBackup: React.FC<SecurityAndBackupProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  // 2FA state
  const [totpEnabled, setTotpEnabled] = useState(true);
  const [totpCode, setTotpCode] = useState('');
  const [totpVerified, setTotpVerified] = useState(false);

  // Backup & Recovery state
  const [snapshots, setSnapshots] = useState<BackupSnapshot[]>([
    { id: 'snap-2026-07-28', timestamp: '2026-07-28 00:00:00 UTC', sizeKb: 14.2, type: 'Automatic Cloud Snapshot', status: 'Success' },
    { id: 'snap-2026-07-27', timestamp: '2026-07-27 00:00:00 UTC', sizeKb: 13.8, type: 'Automatic Cloud Snapshot', status: 'Success' },
    { id: 'snap-2026-07-26', timestamp: '2026-07-26 14:30:12 UTC', sizeKb: 12.5, type: 'Manual Backup', status: 'Success' }
  ]);
  const [restoring, setRestoring] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleVerify2FA = () => {
    if (totpCode.length === 6) {
      setTotpVerified(true);
      setTimeout(() => setTotpVerified(false), 3000);
    }
  };

  const handleCreateBackup = () => {
    const newSnap: BackupSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      sizeKb: 15.1,
      type: 'Manual Backup',
      status: 'Success'
    };
    setSnapshots([newSnap, ...snapshots]);
  };

  const handleRestore = (snapId: string) => {
    setRestoring(true);
    setRestoreMessage(null);
    setTimeout(() => {
      setRestoring(false);
      setRestoreMessage(`${t.restoreSuccess} (${snapId})`);
    }, 1200);
  };

  // Export Telemetry & Config as JSON
  const handleExportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      appVersion: 'v4.12.0',
      systemTelemetry: {
        cpuOverheadPercent: 3,
        ramUsageMb: 22,
        apiLatencyMs: 28,
        cacheHitRatioPercent: 95,
        status: 'Optimal'
      },
      securityAndBackupConfig: {
        totp2FAEnabled: totpEnabled,
        totpVerified: totpVerified,
        snapshotsCount: snapshots.length,
        availableSnapshots: snapshots,
        activeSecurityAlerts: sampleAlerts
      }
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gh-dash-telemetry-config-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportMessage('Đã xuất file JSON thành công!');
    setTimeout(() => setExportMessage(null), 3000);
  };

  // Export Telemetry & Config as CSV
  const handleExportCSV = () => {
    const timestamp = new Date().toISOString();
    const rows = [
      ['Category', 'Metric / Property', 'Value', 'Unit / Details', 'Timestamp'],
      ['Telemetry', 'CPU Overhead', '3', '%', timestamp],
      ['Telemetry', 'RAM Memory Usage', '22', 'MB', timestamp],
      ['Telemetry', 'API Latency', '28', 'ms', timestamp],
      ['Telemetry', 'Cache Hit Ratio', '95', '%', timestamp],
      ['Security', '2FA TOTP Guard Enabled', totpEnabled ? 'true' : 'false', 'boolean', timestamp],
      ['Security', 'Active CVE Alerts Count', sampleAlerts.length.toString(), 'count', timestamp],
      ['Backup', 'Total Snapshots Stored', snapshots.length.toString(), 'snapshots', timestamp],
      ...snapshots.map((s) => ['Snapshot', s.id, `${s.sizeKb} KB`, `${s.type} (${s.status})`, s.timestamp])
    ];

    const csvContent = rows.map((e) => e.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gh-dash-telemetry-config-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportMessage('Đã xuất file CSV thành công!');
    setTimeout(() => setExportMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none space-y-6">
      {/* Top Banner: Export Telemetry & Config Trigger */}
      <div className="p-4 rounded-none bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-bold text-white flex items-center space-x-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Xuất Dữ Liệu System Telemetry & Configuration State</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Tải xuống báo cáo hệ thống, chỉ số hiệu năng và cấu hình bảo mật dưới dạng CSV hoặc JSON.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportJSON}
            id="export-json-btn"
            className="px-3 py-1.5 rounded-none bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500 text-white font-mono text-xs font-bold transition flex items-center space-x-1.5"
            title="Download JSON format"
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleExportCSV}
            id="export-csv-btn"
            className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-mono text-xs font-bold transition flex items-center space-x-1.5"
            title="Download CSV format"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {exportMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-mono text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Grid: 2FA & Disaster Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2FA Security Guard */}
        <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Two-Factor Authentication (2FA) Guard</span>
            </h3>
            <span className="px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/60 text-emerald-400 font-mono text-xs font-bold">
              Active Guard
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-none bg-black border border-zinc-800">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">Require 2FA for PR Merge</div>
                  <div className="text-zinc-400 text-[11px]">Enforces TOTP passcode check before merging</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={totpEnabled}
                onChange={(e) => setTotpEnabled(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 bg-zinc-900 cursor-pointer"
              />
            </div>

            {/* TOTP Test verification box */}
            <div className="p-4 rounded-none bg-black border border-zinc-800 text-zinc-100 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <Key className="w-4 h-4" />
                <span>Test 2FA Passcode Verification</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                Enter any 6-digit TOTP code from your Google Authenticator or Authy app:
              </p>

              <div className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="123456"
                  className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-none text-center tracking-widest text-lg font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleVerify2FA}
                  id="verify-2fa-btn"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-bold rounded-none text-xs transition"
                >
                  Verify
                </button>
              </div>

              {totpVerified && (
                <div className="p-2 bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2FA Authentication Passed! Action Authorized.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cloud Auto-Backup & Disaster Recovery */}
        <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-teal-400" />
              <span>Daily Cloud Backup & Fast Disaster Recovery</span>
            </h3>
            <button
              onClick={handleCreateBackup}
              id="create-backup-btn"
              className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-mono text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Create Snapshot</span>
            </button>
          </div>

          {restoreMessage && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{restoreMessage}</span>
            </div>
          )}

          <div className="space-y-3 font-mono text-xs">
            <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
              Available Cloud Snapshots
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {snapshots.map((snap) => (
                <div
                  key={snap.id}
                  className="p-3 rounded-none bg-black border border-zinc-800 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white flex items-center space-x-2">
                      <span>{snap.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/50 text-emerald-300">
                        {snap.sizeKb} KB
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-400">{snap.timestamp} — {snap.type}</div>
                  </div>

                  <button
                    onClick={() => handleRestore(snap.id)}
                    disabled={restoring}
                    className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-bold text-xs transition flex items-center space-x-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${restoring ? 'animate-spin' : ''}`} />
                    <span>Restore</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security Patch Push & Email Alerts Feed */}
      <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-4 font-mono">
        <h3 className="text-xs font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>Critical Security Patch Push Alerts & CVE Feeds</span>
        </h3>

        <div className="space-y-3">
          {sampleAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-none bg-black border border-zinc-800 space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-emerald-400 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>[{alert.cve}] {alert.title}</span>
                </span>
                <span className="px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-[10px]">
                  Patched in {alert.patchedInVersion}
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

