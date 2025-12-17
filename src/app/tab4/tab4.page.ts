import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonButtons, IonIcon, 
  IonFooter, IonSpinner, IonItem, IonInput 
} from '@ionic/angular/standalone';

// Plugins
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CapacitorHttp } from '@capacitor/core'; 

// Icons
import { addIcons } from 'ionicons';
import { mic, micOff, volumeHigh, language, chatbubbleEllipses, send } from 'ionicons/icons';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonButtons, IonIcon, 
    IonFooter, IonSpinner, IonItem, IonInput,
    CommonModule, TranslateModule, FormsModule
  ]
})
export class Tab4Page {

  @ViewChild(IonContent) content: IonContent | undefined;

  // --- 🔑 PASTE YOUR GEMINI API KEY HERE 🔑 ---
  private GEMINI_API_KEY = 'AIzaSyAlsZ-h6vgTmHUM7bGoxtSPT8HVtwaMVZs';
  // -------------------------------------------

  userInput: string = ''; 
  isLoading: boolean = false;
  messages: ChatMessage[] = []; 
  
  recording: boolean = false;
  currentLang: string = 'en';

  constructor(
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private ngZone: NgZone 
  ) {
    addIcons({ mic, micOff, volumeHigh, language, chatbubbleEllipses, send });
    this.translate.setDefaultLang('en');
    this.addBotMessage("Hi! I am Gemini. Type a message!");
  }

  // --- CHAT HELPERS ---
  addBotMessage(text: string) {
    this.messages.push({ sender: 'bot', text: text });
    this.scrollToBottom();
  }

  addUserMessage(text: string) {
    this.messages.push({ sender: 'user', text: text });
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 100);
  }

  // --- SEND MESSAGE ---
  async sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.userInput = ''; 
    this.addUserMessage(text); 
    
    await this.askGemini(text); 
  }

  // --- GEMINI BRAIN ---
  async askGemini(prompt: string) {
    this.isLoading = true;
    
    // FIX: Trying 'gemini-flash-latest' which was in your available list.
    // This safely points to whatever Flash version your key supports.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.GEMINI_API_KEY}`;
    
    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    try {
      const response = await CapacitorHttp.post({
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: body
      });

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const aiReply = response.data.candidates[0].content.parts[0].text;
        this.addBotMessage(aiReply);
      } else if (response.data.error) {
        this.addBotMessage("⚠️ API Error: " + response.data.error.message);
      } else {
        this.addBotMessage("I couldn't think of an answer.");
      }

    } catch (error) {
      this.addBotMessage("Error connecting to Gemini.");
    } finally {
      this.isLoading = false;
    }
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
  }
  
  async startListening() {}
  async stopListening() {}
}