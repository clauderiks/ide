import React, { useState } from 'react';
import { Bell, Mail, ShieldAlert, CheckCircle2, X, Sliders, Cpu, Cloud, Terminal, Eye } from 'lucide-react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'alerts' | 'performance' | 'security'>('alerts');
  const [cloudSyncFreq, setCloudSyncFreq] = useState('30s');
  const [terminalDensity, setTerminalDensity] = useState('compact');
  const [autoUpdate, setAutoUpdate] = useState(true);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 font-mono select-none">
      <div className="bg-black border border-zinc-800 rounded-none p-5 max-w-lg w-full shadow-[0_0_30px_rgba(0,0,0,0.9)] space-y-5 text-zinc-100">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                CÀI ĐẶT MỜ RỘNG (EXTENDED SETTINGS)
              </h3>
              <p className="text-[10px] text-zinc-400">gh-dash system preferences & notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-zinc-950 border border-zinc-800 p-0.5 text-xs">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-1.5 px-2 text-[11px] font-mono transition flex items-center justify-center space-x-1 ${
              activeTab === 'alerts' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Thông báo</span>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-1.5 px-2 text-[11px] font-mono transition flex items-center justify-center space-x-1 ${
              activeTab === 'performance' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Hiệu năng</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-1.5 px-2 text-[11px] font-mono transition flex items-center justify-center space-x-1 ${
              activeTab === 'security' ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Bảo mật</span>
          </button>
        </div>

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Đã đăng ký thành công! Bạn sẽ nhận cảnh báo bảo mật CVE & bản phát hành mới.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 text-[11px]">Email nhận thông báo hệ thống & CVE Security</label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@github.com"
                      className="flex-1 p-2 border border-zinc-800 bg-zinc-950 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center space-x-1 border border-emerald-400 text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Đăng ký</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white text-xs">Push Notifications</div>
                      <div className="text-[10px] text-zinc-400">Cảnh báo tức thì khi có PR review mới</div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={pushEnabled}
                    onChange={(e) => setPushEnabled(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 bg-zinc-900 border-zinc-700 rounded-none cursor-pointer"
                  />
                </div>
              </form>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-zinc-300">
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tần suất Cloud Sync:</span>
                </span>
                <select
                  value={cloudSyncFreq}
                  onChange={(e) => setCloudSyncFreq(e.target.value)}
                  className="bg-black border border-zinc-800 text-emerald-400 px-2 py-1 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="15s">15 giây (Real-time)</option>
                  <option value="30s">30 giây (Standard)</option>
                  <option value="60s">1 phút (Tiết kiệm data)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mật độ hiển thị Terminal:</span>
                </span>
                <select
                  value={terminalDensity}
                  onChange={(e) => setTerminalDensity(e.target.value)}
                  className="bg-black border border-zinc-800 text-emerald-400 px-2 py-1 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="compact">Gọn nhẹ (IBM Compact)</option>
                  <option value="comfortable">Tiêu chuẩn (Comfortable)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">Tự động cập nhật CLI Extensions</div>
                <div className="text-[10px] text-zinc-400">Đảm bảo gh-dash luôn ở bản mới nhất</div>
              </div>
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[11px] leading-relaxed">
              * Mọi cấu hình mở rộng được mã hóa AES-256 local storage và đồng bộ trực tiếp với file `~/.config/gh-dash/config.yml`.
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-emerald-500 text-xs font-mono transition"
          >
            Đóng Cài Đặt
          </button>
        </div>

      </div>
    </div>
  );
};

