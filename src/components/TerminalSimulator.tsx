import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  GitPullRequest, 
  CircleDot, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  GitBranch, 
  RefreshCw, 
  Search, 
  Command, 
  Eye, 
  HelpCircle,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import { PullRequestItem } from '../types';

const samplePRs: PullRequestItem[] = [
  {
    id: 104,
    title: 'feat: add automated daily cloud backup and quick recovery',
    author: 'dlvhdr',
    branch: 'feat/cloud-backup',
    repo: 'dlvhdr/gh-dash',
    checks: '12/12 Passed',
    reviews: 'Approved by @octocat, @dev-lead',
    updatedAt: '2 mins ago',
    status: 'open',
    body: 'Implements AES-256 cloud snapshot backup worker running daily at 00:00 UTC with 1-click restore mechanism.',
    diff: `+ func BackupCloudSnapshot() error {
+   snapshot := CreateSnapshot()
+   return cloud.UploadEncrypted(snapshot)
+ }`
  },
  {
    id: 102,
    title: 'fix: resolve race condition in real-time telemetry worker',
    author: 'alex-dev',
    branch: 'fix/telemetry-race',
    repo: 'dlvhdr/gh-dash',
    checks: '8/8 Passed',
    reviews: 'Approved by @dlvhdr',
    updatedAt: '15 mins ago',
    status: 'open',
    body: 'Fixes potential mutex deadlock when polling high-frequency CPU metrics under heavy load.',
    diff: `- mu.Lock()
+ mu.RLock()
+ defer mu.RUnlock()`
  },
  {
    id: 98,
    title: 'refactor: upgrade bubbletea framework and add OLED dark theme',
    author: 'sarah-ui',
    branch: 'refactor/bubbletea-v2',
    repo: 'dlvhdr/gh-dash',
    checks: '10/10 Passed',
    reviews: '1 Changes Requested',
    updatedAt: '1 hour ago',
    status: 'open',
    body: 'Upgrades Lipgloss & Bubbletea to latest versions for smooth 60fps rendering and OLED black support.',
    diff: `+ lipgloss.NewStyle().Foreground(lipgloss.Color("#10B981"))`
  },
  {
    id: 95,
    title: 'sec: integrate 2FA TOTP verification for PR merge action',
    author: 'security-bot',
    branch: 'sec/2fa-merge-guard',
    repo: 'dlvhdr/gh-dash',
    checks: '14/14 Passed',
    reviews: 'Approved by @sec-team',
    updatedAt: '3 hours ago',
    status: 'open',
    body: 'Enforces mandatory 6-digit TOTP verification before performing git merge actions.',
    diff: `+ if !VerifyTOTP(code) {
+   return errors.New("Invalid 2FA code")
+ }`
  },
];

export const TerminalSimulator: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'prs' | 'issues'>('prs');
  const [filterText, setFilterText] = useState('');
  const [selectedPR, setSelectedPR] = useState<PullRequestItem | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Press [j/k] to navigate, [Enter] to inspect PR, [c] to checkout, [o] to open in browser');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'j' || e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev < samplePRs.length - 1 ? prev + 1 : prev));
        setStatusMsg('Moved cursor down [j]');
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        setStatusMsg('Moved cursor up [k]');
      } else if (e.key === 'Enter') {
        setSelectedPR(samplePRs[selectedIndex]);
        setStatusMsg(`Inspecting PR #${samplePRs[selectedIndex].id}`);
      } else if (e.key === 'c') {
        setStatusMsg(`Checked out branch locally: git checkout ${samplePRs[selectedIndex].branch}`);
      } else if (e.key === 'o') {
        setStatusMsg(`Opened PR #${samplePRs[selectedIndex].id} in browser`);
      } else if (e.key === 'r') {
        setStatusMsg('Refreshed data from GitHub API [r]');
      } else if (e.key === '?') {
        setShowHelp((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSelectedPR(null);
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono">
      {/* Terminal Container */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-bold text-slate-400 ml-2 flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>gh dash — Terminal Simulator (Live Interactive)</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Cloud Sync: Online</span>
            </span>
            <span className="flex items-center space-x-1 text-purple-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>2FA Guard: Active</span>
            </span>
          </div>
        </div>

        {/* Section Tabs & Filter */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSection('prs')}
              className={`px-3 py-1.5 rounded flex items-center space-x-2 font-bold transition ${
                activeSection === 'prs' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>Pull Requests ({samplePRs.length})</span>
            </button>
            <button
              onClick={() => setActiveSection('issues')}
              className={`px-3 py-1.5 rounded flex items-center space-x-2 font-bold transition ${
                activeSection === 'issues' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Issues (8)</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter: is:open author:@me..."
              className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-purple-500 text-xs"
            />
          </div>
        </div>

        {/* Terminal Body Grid */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[420px]">
          {/* PR List Column */}
          <div className="lg:col-span-2 space-y-2">
            <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-2 flex items-center justify-between">
              <span>Section: Open Pull Requests</span>
              <span>[j/k] to navigate</span>
            </div>

            {samplePRs
              .filter((pr) => pr.title.toLowerCase().includes(filterText.toLowerCase()))
              .map((pr, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={pr.id}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setSelectedPR(pr);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition border ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <GitPullRequest className={`w-4 h-4 shrink-0 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                        <span className="font-bold text-sm">#{pr.id}</span>
                        <span className="text-sm line-clamp-1">{pr.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {pr.updatedAt}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center space-x-1 text-slate-400">
                        <GitBranch className="w-3 h-3 text-purple-400" />
                        <span>{pr.branch}</span>
                      </span>
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{pr.checks}</span>
                      </span>
                      <span>By @{pr.author}</span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Quick Preview Panel */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 font-bold mb-3 flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Live Inspector View</span>
              </div>

              {selectedPR ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-slate-500 text-[10px]">PULL REQUEST TITLE</div>
                    <div className="text-sm font-bold text-purple-300">#{selectedPR.id} {selectedPR.title}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px]">BRANCH & REPO</div>
                    <div className="text-slate-200">{selectedPR.repo} ({selectedPR.branch})</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px]">DESCRIPTION</div>
                    <div className="text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 mt-1">
                      {selectedPR.body}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px]">GIT DIFF SNIPPET</div>
                    <pre className="bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-400 overflow-x-auto text-[11px] mt-1">
                      {selectedPR.diff}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-xs text-center py-12">
                  Select a PR or press [Enter] to inspect full details
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setShowHelp(true)}
                className="text-purple-400 hover:underline flex items-center space-x-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>[?] Keybindings</span>
              </button>
              <span>Press [q] or [Esc] to close</span>
            </div>
          </div>
        </div>

        {/* Status Line Bar */}
        <div className="bg-purple-950/80 px-4 py-2 border-t border-slate-800 text-xs text-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>{statusMsg}</span>
          </div>
          <span className="text-[10px] text-purple-400 font-mono">Use Keyboard: [j] [k] [Enter] [c] [o] [r]</span>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-100 font-mono">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-purple-400 flex items-center space-x-2">
                <Command className="w-4 h-4" />
                <span>Keyboard Shortcuts Reference</span>
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
              >
                ESC
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">j / Down</span>
                <span className="text-slate-400">Move cursor down</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">k / Up</span>
                <span className="text-slate-400">Move cursor up</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">Enter</span>
                <span className="text-slate-400">View detailed PR inspector</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">c</span>
                <span className="text-slate-400">Checkout branch locally</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">o</span>
                <span className="text-slate-400">Open in GitHub web browser</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-purple-300">r</span>
                <span className="text-slate-400">Refresh API data</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
