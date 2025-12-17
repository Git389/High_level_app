import { Component, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonIcon, IonList, IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

import { ThemeService } from '../services/theme.service';

// Services
import { DatabaseService } from '../services/database.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { PluginListenerHandle } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Icons
import { addIcons } from 'ionicons';
import { mic, micOff, volumeHigh, language, logIn, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,

    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonIcon,
    IonList, IonItem, IonLabel,
    IonToggle
  ],
})
export class Tab1Page implements OnDestroy {

  statusMessage: string = 'Not connected yet.';
  currentLang: string = 'en';

  isLoggedIn: boolean = false;
  currentUser: string = '';
  teamMembers: any[] = [];

  // ---- SPEECH STATE ----
  recording: boolean = false;
  spokenText: string = 'Press mic to speak...';

  private partialListener?: PluginListenerHandle;
  private listeningStateListener?: PluginListenerHandle;

  constructor(
    private dbService: DatabaseService,
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private ngZone: NgZone,
    private toastCtrl: ToastController,
    private theme: ThemeService
  ) {
    addIcons({ mic, micOff, volumeHigh, language, logIn, personCircle });
    this.translate.setDefaultLang('en');
  }

  // -------- THEME --------
  async toggleTheme(ev: any) {
    const isDark = !!ev?.detail?.checked;
    await this.theme.setTheme(isDark ? 'dark' : 'light');
  }

  // -------- POPUP / NOTIFICATION (TOAST) --------
  async showGroupPopup() {
    const toast = await this.toastCtrl.create({
      message: 'Swiss Army App: Group members loaded ✅',
      duration: 1800,
      position: 'bottom',
      buttons: [{ text: 'OK', role: 'cancel' }],
    });
    await toast.present();
  }

  // =========================
  // ✅ CLEAN SPEECH CYCLE
  // =========================

  async startListening() {
    try {
      await this.removeSpeechListeners();

      this.recording = true;
      this.spokenText = 'Listening...';

      await SpeechRecognition.requestPermissions();

      // partialResults listener (supported by your package)
      this.partialListener = await SpeechRecognition.addListener('partialResults', (data: any) => {
        this.ngZone.run(() => {
          if (data?.matches?.length > 0) {
            this.spokenText = data.matches[0];
            this.changeRef.detectChanges();
          }
        });
      });

      // listening state listener (started/stopped)
      this.listeningStateListener = await SpeechRecognition.addListener('listeningState', (data: any) => {
        this.ngZone.run(() => {
          if (data?.status === 'stopped') {
            this.recording = false;

            if (!this.spokenText || this.spokenText === 'Listening...') {
              this.spokenText = 'Could not recognize speech.';
            }

            this.changeRef.detectChanges();
          }
        });
      });

      await SpeechRecognition.start({
        language: this.currentLang === 'de' ? 'de-DE' : 'en-US',
        maxResults: 1,
        partialResults: true,
        popup: false,
      });

      // Auto stop (prevents stuck mic)
      setTimeout(() => {
        if (this.recording) this.stopListening();
      }, 6000);

    } catch (err) {
      console.error('SpeechRecognition error:', err);
      this.recording = false;
      this.spokenText = 'Mic error. Try again.';
    }
  }

  async stopListening() {
    try {
      await SpeechRecognition.stop();
    } catch {
      // ignore
    } finally {
      this.recording = false;
      this.changeRef.detectChanges();
    }
  }

  // ---- TEXT → SPEECH ----
  async speakText() {
    if (
      !this.spokenText ||
      this.spokenText === 'Press mic to speak...' ||
      this.spokenText === 'Listening...' ||
      this.spokenText === 'Could not recognize speech.'
    ) return;

    try {
      await TextToSpeech.speak({
        text: this.spokenText,
        lang: this.currentLang === 'de' ? 'de-DE' : 'en-US',
        rate: 1.0,
      });
    } catch (err) {
      console.error('TTS error:', err);
    }
  }

  resetSpeech() {
    this.spokenText = 'Press mic to speak...';
    this.recording = false;
  }

  private async removeSpeechListeners() {
    try {
      if (this.partialListener) {
        await this.partialListener.remove();
        this.partialListener = undefined;
      }
      if (this.listeningStateListener) {
        await this.listeningStateListener.remove();
        this.listeningStateListener = undefined;
      }
    } catch {
      // ignore
    }
  }

  ngOnDestroy() {
    this.removeSpeechListeners();
  }

  // -------- LOGIN --------
  async login() {
    const user = prompt("Enter Name to Login:");
    if (!user) return;

    this.statusMessage = "Verifying...";
    const result: any = await this.dbService.loginUser(user);

    this.ngZone.run(() => {
      if (result?.success) {
        this.isLoggedIn = true;
        this.currentUser = result.user?.name || user;
        this.statusMessage = "Login Successful!";
        this.loadTeam();
      } else {
        alert("Login Failed: " + (result?.message || "Unknown Error"));
        this.statusMessage = "❌ Login failed";
      }
      this.changeRef.detectChanges();
    });
  }

  async loadTeam() {
    const data = await this.dbService.getTeamMembers();
    this.ngZone.run(() => {
      this.teamMembers = data || [];
      this.changeRef.detectChanges();
    });
  }

  // -------- EXTRAS --------
  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
  }

  async onTestConnection() {
    this.statusMessage = 'Connecting...';
    const result: any = await this.dbService.testConnection();

    this.ngZone.run(() => {
      this.statusMessage = result?.success ? '✅ Connected' : '❌ Error';
      this.changeRef.detectChanges();
    });
  }
}
 