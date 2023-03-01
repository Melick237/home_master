import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'room',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    "url": "http://127.0.0.1"
  }
};

export default config;
