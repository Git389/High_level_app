import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme_mode';

  async initTheme() {
    const saved = await Preferences.get({ key: this.key });
    const mode = (saved.value as ThemeMode) || 'light';
    this.applyTheme(mode);
  }

  async setTheme(mode: ThemeMode) {
    await Preferences.set({ key: this.key, value: mode });
    this.applyTheme(mode);
  }

  applyTheme(mode: ThemeMode) {
    // ✅ Ionic way (works reliably)
    document.documentElement.setAttribute('ion-theme', mode);

    // optional: also toggle class (not required)
    document.body.classList.toggle('dark', mode === 'dark');
  }

  // helper if you want to set initial toggle state later
  async getTheme(): Promise<ThemeMode> {
    const saved = await Preferences.get({ key: this.key });
    return (saved.value as ThemeMode) || 'light';
  }
}
