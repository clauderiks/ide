import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Activity, Cpu, HardDrive, Zap, RefreshCw, Flame, CheckCircle, ShieldCheck } from 'lucide-react';
import { TelemetryPoint, Language } from '../types';
import { translations } from '../data/translations';

interface TelemetryDashboardProps {
  language: Language;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [data, setData] = useState<TelemetryPoint[]>([]);
  const [stressTesting, setStressTesting] = useState(false);
  const [cacheOptimized, setCacheOptimized] = useState(true);

  // Generate real-time telemetry stream
  useEffect(() => {
    const initialPoints: TelemetryPoint[] = Array.from({ length: 12 }, (_, i) => {
      const timeStr = `${10 + i}:00`;
      return {
        time: timeStr,
        cpu: Math.floor(Math.random() * 8 + 2),
        memory: Math.floor(Math.random() * 5 + 20),
        latency: Math.floor(Math.random() * 15 + 25),
        requests: Math.floor(Math.random() * 20 + 80),
        cacheHitRatio: Math.floor(Math.random() * 5 + 92),
      };
    });
    setData(initialPoints);

    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date();
        const timeStr = `${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`;
        const last = prevData[prevData.length - 1] || { cpu: 5, memory: 22, latency: 30, requests: 100, cacheHitRatio: 94 };

        const cpuNoise = stressTesting ? Math.random() * 45 + 30 : Math.random() * 6 - 3;
        const newCpu = Math.min(100, Math.max(1, Math.round(last.cpu + cpuNoise)));
        const newMem = Math.min(128, Math.max(15, Math.round(last.memory + (stressTesting ? 8 : (Math.random() * 2 - 1)))));
        const newLatency = Math.min(200, Math.max(10, Math.round(last.latency + (stressTesting ? 30 : (Math.random() * 4 - 2)))));
        const newRequests = Math.round(last.requests + Math.random() * 10 - 5);
        const newHitRatio = cacheOptimized ? Math.min(99, Math.max(88, Math.round(last.cacheHitRatio + Math.random() * 2 - 1))) : 62;

        const updated = [...prevData.slice(1), {
          time: timeStr,
          cpu: newCpu,
          memory: newMem,
          latency: newLatency,
          requests: newRequests,
          cacheHitRatio: newHitRatio,
        }];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stressTesting, cacheOptimized]);

  const latest = data[data.length - 1] || { cpu: 3, memory: 22, latency: 28, requests: 95, cacheHitRatio: 95 };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none space-y-6">
      {/* Metric Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-none bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>CPU OVERHEAD</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {latest.cpu}%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Optimal (Bubbletea async)</span>
          </div>
        </div>

        <div className="p-4 rounded-none bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>MEMORY (RAM)</span>
            <HardDrive className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {latest.memory} MB
          </div>
          <div className="text-[11px] text-teal-400 font-mono">
            Low memory footprint
          </div>
        </div>

        <div className="p-4 rounded-none bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>API LATENCY</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {latest.latency} ms
          </div>
          <div className="text-[11px] text-amber-400 font-mono">
            GitHub GraphQL Endpoint
          </div>
        </div>

        <div className="p-4 rounded-none bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>CACHE HIT RATIO</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {latest.cacheHitRatio}%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Smart TTL Cache Engine
          </div>
        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="p-3 rounded-none bg-black border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 font-mono text-xs">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold text-zinc-200">
            Real-time Telemetry Simulator Controls:
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setStressTesting((prev) => !prev)}
            id="stress-test-btn"
            className={`px-3 py-1.5 rounded-none font-mono text-xs font-bold transition flex items-center space-x-1.5 border ${
              stressTesting
                ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-rose-500 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{stressTesting ? 'Stop Stress Load' : 'Simulate Heavy Load'}</span>
          </button>

          <button
            onClick={() => setCacheOptimized((prev) => !prev)}
            id="cache-toggle-btn"
            className={`px-3 py-1.5 rounded-none font-mono text-xs font-bold transition flex items-center space-x-1.5 border ${
              cacheOptimized
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-amber-600 text-white border-amber-400'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cache Optimization: {cacheOptimized ? 'ON (95%)' : 'OFF (60%)'}</span>
          </button>
        </div>
      </div>

      {/* Main Recharts Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU & Latency Area Chart */}
        <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold font-mono text-white flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>CPU Load (%) & Latency (ms) History</span>
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '0px', color: '#10b981', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#10B981" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" />
                <Area type="monotone" dataKey="latency" stroke="#F59E0B" fillOpacity={1} fill="url(#colorLatency)" name="Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cache Hit & API Quota Bar Chart */}
        <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold font-mono text-white flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Cache Hit Efficiency (%) & Requests/min</span>
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '0px', color: '#10b981', fontSize: '12px' }}
                />
                <Bar dataKey="cacheHitRatio" fill="#10B981" name="Cache Hit %" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
