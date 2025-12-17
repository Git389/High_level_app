import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonLabel, IonInput,
  IonButton
} from '@ionic/angular/standalone';

import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonLabel, IonInput,
    IonButton
  ],
})
export class Tab5Page implements OnDestroy {
  minutes = 5;
  secondsLeft = 0;
  running = false;

  private intervalId: any = null;
  private END_KEY = 'timer_end_ms';
  private NOTIF_ID = 5001;

  constructor(private toastCtrl: ToastController) {}

  async ionViewWillEnter() {
    await LocalNotifications.requestPermissions();

    const saved = await Preferences.get({ key: this.END_KEY });
    if (saved.value) {
      const endMs = Number(saved.value);
      const diff = Math.max(0, Math.floor((endMs - Date.now()) / 1000));
      if (diff > 0) {
        this.startUiCountdown(diff);
      } else {
        await Preferences.remove({ key: this.END_KEY });
      }
    }
  }

  async startTimer() {
    const totalSeconds = Math.max(1, Math.floor(Number(this.minutes) * 60));
    const endMs = Date.now() + totalSeconds * 1000;

    await Preferences.set({ key: this.END_KEY, value: String(endMs) });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: this.NOTIF_ID,
          title: 'Timer ended ⏰',
          body: 'Your timer is finished.',
          schedule: { at: new Date(endMs) },
        },
      ],
    });

    this.startUiCountdown(totalSeconds);

    const toast = await this.toastCtrl.create({
      message: `Timer started for ${this.minutes} minute(s) `,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  private startUiCountdown(totalSeconds: number) {
    this.secondsLeft = totalSeconds;
    this.running = true;

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(async () => {
      this.secondsLeft--;

      if (this.secondsLeft <= 0) {
        this.secondsLeft = 0;
        this.running = false;

        clearInterval(this.intervalId);
        this.intervalId = null;

        await Preferences.remove({ key: this.END_KEY });

        const toast = await this.toastCtrl.create({
          message: 'Timer ended ⏰',
          duration: 1800,
          position: 'bottom',
        });
        await toast.present();
      }
    }, 1000);
  }

  async stopTimer() {
    this.running = false;
    this.secondsLeft = 0;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    await Preferences.remove({ key: this.END_KEY });
    await LocalNotifications.cancel({ notifications: [{ id: this.NOTIF_ID }] });

    const toast = await this.toastCtrl.create({
      message: 'Timer stopped.',
      duration: 1200,
      position: 'bottom',
    });
    await toast.present();
  }

  formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
