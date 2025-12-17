import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, CommonModule],
})
export class Tab3Page {

  map: L.Map | undefined;

  constructor() {
    addIcons({ locate });
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    if (this.map) this.map.remove();

    // --- COORDINATES ---
    // 1. SRH University Heidelberg (From your link)
    const collegeLat = 49.413892; 
    const collegeLng = 8.651052; 

    // 2. Your Location (Mannheimer Str. 306, Heidelberg)
    const homeLat = 49.4288;
    const homeLng = 8.6435;

    // Initialize Map (Centered between the two points)
    this.map = L.map('mapId').setView([49.4200, 8.6470], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // --- ADD MARKERS ---
    
    // College Marker (Red Icon logic if you had it, defaulting to Blue)
    this.addMarker(collegeLat, collegeLng, "SRH University", "My College Campus");

    // Home Marker
    this.addMarker(homeLat, homeLng, "My Location", "Mannheimer Str. 306");

    // Also try to find real GPS position (Blue Dot)
    await this.locateUser();
    
    setTimeout(() => { this.map?.invalidateSize(); }, 500);
  }

  async locateUser() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const myLat = coordinates.coords.latitude;
      const myLng = coordinates.coords.longitude;

      // Add marker for Real-Time GPS
      this.addMarker(myLat, myLng, "Real-Time GPS", "You are here.");
      
    } catch (error) {
      console.log("GPS not active or permission denied.");
    }
  }

  addMarker(lat: number, lng: number, title: string, desc: string) {
    if (this.map) {
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`<b>${title}</b><br>${desc}`);
        // Removed .openPopup() so it doesn't clutter the screen immediately
    }
  }
}