export type Language = 'en' | 'vi' | 'ja' | 'es';
export type ThemeMode = 'light' | 'dark' | 'oled';

export interface Translation {
  tabReadme: string;
  tabTerminal: string;
  tabConfig: string;
  tabTelemetry: string;
  tabApi: string;
  tabSecurity: string;
  tabCommunity: string;
  subtitle: string;
  cloudSync: string;
  syncSyncing: string;
  syncActive: string;
  emailAlerts: string;
  [key: string]: string;
}

export interface TelemetryData {
  status: string;
  version: string;
  uptimeSeconds: number;
  cpuUsagePercent: number;
  memoryMb: number;
  apiCallsCount: number;
  cloudSyncState: string;
}

export interface ConfigSettings {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    borderStyle: string;
  };
  defaults: {
    previewWidth: number;
    refreshInterval: number;
    language: Language;
  };
  cloudSync: {
    enabled: boolean;
    autoBackupDaily: boolean;
    encryption: string;
  };
  security: {
    require2FAForMerge: boolean;
    securityPatchAlerts: boolean;
  };
}

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface ApiResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
  duration: number;
}
