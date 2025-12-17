import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SwissArmyApp',
  webDir: 'www',
  server: {
    cleartext: true // Allows http:// connection for Live Reload
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0 // instantly hide splash screen to see errors
    }
  }
};


export default config;