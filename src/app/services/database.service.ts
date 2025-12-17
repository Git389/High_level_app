import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // YOUR HOSTINGER DOMAIN
  private baseURL = 'https://globalreportmaker.online/api'; 

  constructor() { }

  // 1. Test Connection
  async testConnection() {
    const options = {
      url: `${this.baseURL}/test_connection.php`,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      return response.data;
    } catch (error) {
      console.error('Error connecting to DB:', error);
      return { success: false, message: 'Connection Failed' };
    }
  }

  // 2. Save Scan (QR Code)
  async saveScan(text: string) {
    const options = {
      url: `${this.baseURL}/save_scan.php`,
      headers: { 'Content-Type': 'application/json' },
      data: { content: text }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Save Failed' };
    }
  }

  // 3. Get Team Members
  async getTeamMembers() {
    const options = {
      url: `${this.baseURL}/get_team.php`,
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      return response.data; 
    } catch (error) {
      console.error('Error fetching team:', error);
      return [];
    }
  }

  // 4. LOGIN (Updated to use login_high_level.php)
  async loginUser(username: string) {
    const options = {
      url: `${this.baseURL}/login_high_level.php`,
      headers: { 'Content-Type': 'application/json' },
      data: { name: username }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      return response.data; 
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login API Failed' };
    }
  }
}