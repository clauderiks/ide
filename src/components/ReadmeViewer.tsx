import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, Download, Copy, Check, FileText, Code, Edit3, Eye, Columns, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { readmeTexts } from '../data/readmeData';
import { translations } from '../data/translations';

interface ReadmeViewerProps {
  language: Language;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportFormat, setExportFormat] = useState<'md' | 'json' | 'html'>('md');
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  
  const initialText = readmeTexts[language] || readmeTexts.en;
  const [markdownContent, setMarkdownContent] = useState(initialText);

  // Sync state if language changes
  useEffect(() => {
    setMarkdownContent(readmeTexts[language] || readmeTexts.en);
  }, [language]);

  const t = translations[language] || translations.en;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMarkdownContent(readmeTexts[language] || readmeTexts.en);
  };

  const handleExport = () => {
    let content = markdownContent;
    let mimeType = 'text/markdown';
    let filename = `README-${language}.md`;

    if (exportFormat === 'json') {
      content = JSON.stringify({ title: 'gh-dash README', language, content: markdownContent }, null, 2);
      mimeType = 'application/json';
      filename = `README-${language}.json`;
    } else if (exportFormat === 'html') {
      content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>README (${language})</title><style>body{background:#000;color:#e4e4e7;font-family:monospace;padding:2rem;}pre{background:#18181b;padding:1rem;border:1px solid #27272a;}</style></head><body><pre>${markdownContent.replace(/</g, '&lt;')}</pre></body></html>`;
      mimeType = 'text/html';
      filename = `README-${language}.html`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tocList = [
    { id: '1-tổng-quan--tính-năng-nổi-bật', label: '1. Overview & Features' },
    { id: '2-hướng-dẫn-cài-đặt-nhanh', label: '2. Installation Guide' },
    { id: '3-minh-họa-trực-quan--phím-tắt', label: '3. Visual Demo & Keybindings' },
    { id: '4-hướng-dẫn-triển-khai-nhanh-trên-github', label: '4. GitHub Quick Deployment' },
    { id: '5-tùy-chọn-cấu-hình-nâng-cao', label: '5. Advanced Config (config.yml)' },
    { id: '6-bảng-thông-số-tùy-biến-đầy-đủ', label: '6. Customization Matrix' },
    { id: '7-tài-liệu-hướng-dẫn-api--ví-dụ-tích-hợp', label: '7. API Reference & Code Examples' },
    { id: '8-đồng-bộ-đám-mây--thống-kê-hiệu-suất', label: '8. Real-time Telemetry & Sync' },
    { id: '9-cơ-chế-sao-lưu-tự-động--khôi-phục-nhanh', label: '9. Daily Backup & Disaster Recovery' },
    { id: '10-bảo-mật-2fa--hệ-thống-cảnh-báo', label: '10. Security 2FA & Push Alerts' },
    { id: '11-khắc-phục-sự-cố-phổ-biến', label: '11. Troubleshooting & FAQ' },
    { id: '12-diễn-đàn-cộng-đồng--đóng-góp-pull-request', label: '12. Community Forum & PRs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none">
      {/* Top Controls Bar - IBM Carbon Square Aesthetics */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-none bg-zinc-950 border border-zinc-800">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder || "Search README..."}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black border border-zinc-800 rounded-none text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
          />
        </div>

        {/* View Mode Split/Editor/Preview Switcher */}
        <div className="flex items-center bg-black border border-zinc-800 p-0.5 rounded-none text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1 px-2 py-1 rounded-none text-[11px] font-mono transition ${
              viewMode === 'split' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
            title="Split Editor & Preview"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            onClick={() => setViewMode('editor')}
            className={`flex items-center space-x-1 px-2 py-1 rounded-none text-[11px] font-mono transition ${
              viewMode === 'editor' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
            title="Editor Only"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editor</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1 px-2 py-1 rounded-none text-[11px] font-mono transition ${
              viewMode === 'preview' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
            title="Preview Only"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Reset Template */}
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-none bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
            title="Reset to default template"
          >
            <RotateCcw className="w-3 h-3 text-zinc-400" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            id="copy-readme-btn"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 hover:border-emerald-500/60 hover:text-emerald-400 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? t.copySuccess : 'Copy MD'}</span>
          </button>

          {/* Export Formats */}
          <div className="flex items-center space-x-1 border border-zinc-800 rounded-none bg-black p-0.5">
            {(['md', 'json', 'html'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                className={`px-1.5 py-0.5 text-[10px] font-mono rounded-none uppercase transition ${
                  exportFormat === fmt ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                .{fmt}
              </button>
            ))}
            <button
              onClick={handleExport}
              id="export-readme-btn"
              className="flex items-center space-x-1 px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-semibold hover:bg-emerald-900 transition"
            >
              <Download className="w-3 h-3" />
              <span>{t.exportLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left TOC Navigation Bar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-3.5 rounded-none bg-zinc-950 border border-zinc-800 sticky top-28">
            <h3 className="text-xs font-bold font-mono text-white mb-2.5 flex items-center space-x-2 border-b border-zinc-800/80 pb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Table of Contents</span>
            </h3>
            <ul className="space-y-1 text-[11px] font-mono text-zinc-400">
              {tocList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    className="block p-1 rounded-none hover:bg-zinc-900 hover:text-emerald-400 border border-transparent hover:border-zinc-800 transition truncate"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Split Editor and Live Markdown Preview Container */}
        <div className="lg:col-span-3 space-y-4">
          <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* Raw Textarea Markdown Editor */}
            {(viewMode === 'split' || viewMode === 'editor') && (
              <div className="flex flex-col border border-zinc-800 bg-black rounded-none">
                <div className="flex items-center justify-between bg-zinc-950 border-b border-zinc-800 px-3 py-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Markdown Source Editor</span>
                  </span>
                  <span className="text-[10px] text-zinc-500">{markdownContent.length} chars</span>
                </div>
                <textarea
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Type markdown code here..."
                  rows={28}
                  className="w-full p-4 bg-black text-emerald-400 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-y leading-relaxed border-none selection:bg-emerald-500 selection:text-black"
                  style={{ tabSize: 2 }}
                />
              </div>
            )}

            {/* Live Rendered Markdown Preview */}
            {(viewMode === 'split' || viewMode === 'preview') && (
              <div className="flex flex-col border border-zinc-800 bg-zinc-950/80 rounded-none">
                <div className="flex items-center justify-between bg-zinc-900/90 border-b border-zinc-800 px-3 py-2 text-xs font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Output Preview</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">• Live Rendered</span>
                </div>
                <div className="p-4 sm:p-6 text-zinc-200 font-mono text-xs leading-relaxed overflow-x-auto min-h-[500px]">
                  <div className="markdown-body space-y-4 prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

