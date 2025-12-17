import { Component, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { DatabaseService } from '../services/database.service';
import { CommonModule } from '@angular/common';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { addIcons } from 'ionicons';
import { mic, micOff } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFab, IonFabButton, CommonModule],
})
export class Tab1Page {
  
  statusMessage: string = 'Not connected yet.';
  recording: boolean = false;
  spokenText: string = 'Press the Mic button to speak...';

  constructor(private dbService: DatabaseService, private changeRef: ChangeDetectorRef) {
    addIcons({ mic, micOff });
  }

  // 1. Connection Test (Existing)
  async onTestConnection() {
    this.statusMessage = 'Connecting...';
    const result: any = await this.dbService.testConnection();
    if (result && result.success) {
      this.statusMessage = '✅ Success: ' + result.message;
    } else {
      this.statusMessage = '❌ Error: Could not reach Hostinger.';
    }
  }

  // 2. Voice to Text Logic (New)
  async startListening() {
    // Check Permission
    const { available } = await SpeechRecognition.available();
    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        language: "en-US",
        maxResults: 1,
        prompt: "Speak now...",
        partialResults: true,
        popup: false,
      });

      // Listen for partial results (while you are talking)
      SpeechRecognition.addListener('partialResults', (data: any) => {
        if (data.matches && data.matches.length > 0) {
          this.spokenText = data.matches[0];
          this.changeRef.detectChanges(); // Force UI update
        }
      });
    }
  }

  async stopListening() {
    this.recording = false;
    await SpeechRecognition.stop();
  }
}