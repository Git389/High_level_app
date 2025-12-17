import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon 
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
// 👇 NEW IMPORT HERE 👇
import { CapacitorFlash } from '@capgo/capacitor-flash'; 
import { addIcons } from 'ionicons';
import { camera, qrCode, flashlight } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, CommonModule
  ]
})
export class Tab2Page {

  capturedImage: any = null;
  isLightOn: boolean = false;

  constructor() {
    addIcons({ camera, qrCode, flashlight });
  }

  // 1. Magnifier / Camera Logic
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false, 
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      this.capturedImage = image.webPath;
    } catch (error) {
      console.log('User cancelled:', error);
    }
  }

  // 2. QR Scanner Logic
  async scanQR() {
    const status = await BarcodeScanner.checkPermissions();
    if (status.camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }
    document.querySelector('body')?.classList.add('scanner-active');
    
    const result = await BarcodeScanner.scan();
    
    document.querySelector('body')?.classList.remove('scanner-active');
    if (result.barcodes.length > 0) {
      alert("Scanned: " + result.barcodes[0].rawValue);
    }
  }

  // 3. Flashlight Logic (UPDATED)
  async toggleLight() {
    this.isLightOn = !this.isLightOn;
    // The simple toggle() function handles everything
    await CapacitorFlash.toggle();
  }
}