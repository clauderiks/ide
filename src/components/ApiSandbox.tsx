import React, { useState } from 'react';
import { Code2, Play, Copy, Check, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface ApiSandboxProps {
  language: Language;
}

export const ApiSandbox: React.FC<ApiSandboxProps> = ({ language }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'telemetry' | 'prs' | 'sync'>('telemetry');
  const [selectedSdk, setSelectedSdk] = useState<'node' | 'go' | 'python' | 'curl'>('node');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<string, Record<string, string>> = {
    telemetry: {
      node: `import { GhDashClient } from 'gh-dash-sdk';

const client = new GhDashClient({
  endpoint: 'http://localhost:3000/api/v1',
  token: process.env.GH_DASH_TOKEN
});

const telemetry = await client.getTelemetry();
console.log('System Status:', telemetry.status, 'CPU:', telemetry.cpuUsagePercent);`,
      go: `package main

import (
    "fmt"
    "github.com/dlvhdr/gh-dash/sdk"
)

func main() {
    client := sdk.NewClient("http://localhost:3000/api/v1")
    telemetry, err := client.GetTelemetry()
    if err != nil {
        panic(err)
    }
    fmt.Printf("Status: %s, CPU: %.2f%%\n", telemetry.Status, telemetry.CpuUsagePercent)
}`,
      python: `from gh_dash_sdk import GhDashClient
import os

client = GhDashClient(endpoint="http://localhost:3000/api/v1", token=os.getenv("GH_DASH_TOKEN"))
telemetry = client.get_telemetry()
print(f"Status: {telemetry['status']}, Memory: {telemetry['memoryMb']}MB")`,
      curl: `curl -X GET "http://localhost:3000/api/v1/telemetry" \\
  -H "Authorization: Bearer $GH_DASH_TOKEN" \\
  -H "Content-Type: application/json"`
    },
    prs: {
      node: `const prs = await client.getPullRequests({ filter: 'is:open author:@me' });
console.log('Open PRs count:', prs.length);`,
      go: `prs, err := client.GetPullRequests("is:open author:@me")
fmt.Println("PRs count:", len(prs))`,
      python: `prs = client.get_pull_requests(filter="is:open author:@me")
print(f"Open PRs: {len(prs)}")`,
      curl: `curl -X GET "http://localhost:3000/api/v1/prs?filter=is:open" \\
  -H "Authorization: Bearer $GH_DASH_TOKEN"`
    },
    sync: {
      node: `const result = await client.triggerCloudSync({ force: true });
console.log('Sync status:', result.status);`,
      go: `res, err := client.TriggerCloudSync(true)
fmt.Println("Sync state:", res.State)`,
      python: `res = client.trigger_cloud_sync(force=True)
print("Sync:", res["status"])`,
      curl: `curl -X POST "http://localhost:3000/api/v1/sync" \\
  -H "Authorization: Bearer $GH_DASH_TOKEN" \\
  -d '{"force": true}'`
    }
  };

  const executeApiCall = () => {
    setLoading(true);
    setApiResponse(null);

    setTimeout(() => {
      setLoading(false);
      if (selectedEndpoint === 'telemetry') {
        setApiResponse(JSON.stringify({
          status: "healthy",
          version: "4.12.0",
          uptimeSeconds: 86400,
          cpuUsagePercent: 1.2,
          memoryMb: 24.5,
          apiCallsCount: 1420,
          cloudSyncState: "synced",
          timestamp: new Date().toISOString()
        }, null, 2));
      } else if (selectedEndpoint === 'prs') {
        setApiResponse(JSON.stringify({
          totalCount: 2,
          items: [
            { id: 104, title: "feat: add automated daily cloud backup", author: "dlvhdr", status: "open" },
            { id: 102, title: "fix: resolve telemetry worker race condition", author: "alex-dev", status: "open" }
          ]
        }, null, 2));
      } else {
        setApiResponse(JSON.stringify({
          success: true,
          status: "synced",
          snapshotId: "snap-2026-07-28-01",
          bytesTransferred: 4102,
          cloudRegion: "asia-east1"
        }, null, 2));
      }
    }, 600);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeSnippets[selectedEndpoint][selectedSdk]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-none bg-black text-white border border-zinc-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold font-mono flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Developer API Documentation & Interactive Sandbox</span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Integrate gh-dash REST API and SDK into custom developer workflows, Go utilities, and CI/CD pipelines.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-none bg-emerald-950/80 border border-emerald-500/50 font-mono text-xs text-emerald-300">
          REST API v1
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Endpoint Selector & Runner */}
        <div className="space-y-6">
          <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
              1. Choose API Endpoint
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <button
                onClick={() => setSelectedEndpoint('telemetry')}
                className={`w-full p-3 rounded-none border text-left flex items-center justify-between transition ${
                  selectedEndpoint === 'telemetry'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/60 text-emerald-400 font-bold">
                    GET
                  </span>
                  <span>/api/v1/telemetry</span>
                </div>
                <span className="text-[10px] text-zinc-500">System metrics</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('prs')}
                className={`w-full p-3 rounded-none border text-left flex items-center justify-between transition ${
                  selectedEndpoint === 'prs'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/60 text-emerald-400 font-bold">
                    GET
                  </span>
                  <span>/api/v1/prs</span>
                </div>
                <span className="text-[10px] text-zinc-500">List active PRs</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('sync')}
                className={`w-full p-3 rounded-none border text-left flex items-center justify-between transition ${
                  selectedEndpoint === 'sync'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-none bg-teal-950 border border-teal-500/60 text-teal-400 font-bold">
                    POST
                  </span>
                  <span>/api/v1/sync</span>
                </div>
                <span className="text-[10px] text-zinc-500">Trigger Cloud Sync</span>
              </button>
            </div>

            <button
              onClick={executeApiCall}
              id="test-api-call-btn"
              disabled={loading}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-mono text-xs font-bold transition flex items-center justify-center space-x-2 rounded-none"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{loading ? 'Executing Request...' : 'Run Live API Test'}</span>
            </button>
          </div>

          {/* Response Inspector */}
          {apiResponse && (
            <div className="p-5 rounded-none bg-black border border-zinc-800 text-zinc-100 font-mono space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>HTTP 200 OK — Live Payload Response</span>
                </span>
                <span className="text-[10px] text-zinc-500">Latency: 22ms</span>
              </div>
              <pre className="p-3 bg-zinc-950 rounded-none border border-zinc-800 text-xs text-emerald-400 overflow-x-auto max-h-64">
                {apiResponse}
              </pre>
            </div>
          )}
        </div>

        {/* Right Code Snippet Box */}
        <div className="p-5 rounded-none bg-black border border-zinc-800 font-mono text-zinc-100 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-2">
              <FileCode className="w-4 h-4" />
              <span>Integration SDK Code Examples</span>
            </span>

            {/* Language SDK Switcher */}
            <div className="flex items-center space-x-1 bg-zinc-950 p-0.5 rounded-none border border-zinc-800 text-xs">
              {(['node', 'go', 'python', 'curl'] as const).map((sdk) => (
                <button
                  key={sdk}
                  onClick={() => setSelectedSdk(sdk)}
                  className={`px-2 py-0.5 font-bold transition rounded-none ${
                    selectedSdk === sdk ? 'bg-emerald-600 text-white border border-emerald-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sdk.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleCopySnippet}
              className="absolute top-2 right-2 px-2.5 py-1 rounded-none bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 text-xs text-zinc-300 transition flex items-center space-x-1 z-10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>

            <pre className="p-4 bg-zinc-950 rounded-none border border-zinc-800 text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-[480px]">
              {codeSnippets[selectedEndpoint][selectedSdk]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
