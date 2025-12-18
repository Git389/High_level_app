# High Level App – Ionic + Capacitor (Android)

This project is a **college project** built using **Ionic (Angular)** and **Capacitor**.  
The goal of the app is to demonstrate multiple **high-level mobile features** inside a single application and to run it both in the browser and as an **Android APK**.

The app uses a **tabs-based layout** and is designed to look consistent on **real Android devices**, not just in the browser.

---

## Features (High-Level Demonstration)

- Tabs-based navigation (Tab1, Tab2, Tab3, etc.)
- Camera access
- QR / Barcode scanning
- Text-to-Speech
- Speech-to-Text
- Geolocation (GPS)
- Open external websites (Browser API)
- Haptics
- Keyboard handling
- Local notifications
- Preferences (local storage)
- Status bar control
- Flashlight
- Multi-language support (i18n)
- Theme handling (light mode enforced for consistency)

---

## Tech Stack

- Ionic (Angular)
- Capacitor (Android)
- Node.js + npm
- Android Studio + Android SDK
- Java **JDK 21** (required for Android build)
- Git & GitHub (version control)

---

## Project Structure (Important)

```text
src/
  app/
    tab1/           -> Student Home (inputs, buttons, demo popup)
    tab2/           -> Course selection (radio + select)
    tab3/           -> Professor information + website button
    tabs/           -> Tabs routing and layout
  assets/
    srh_logo.png
    i18n/
android/
  app/


Prerequisites

Install the following before running the project:

Node.js (LTS)

Ionic CLI

npm install -g @ionic/cli


Git

//Android Studio (with Android SDK + Platform Tools)

//Java JDK 21 (mandatory)

//Android builds will fail if Java 21 is not installed.




**Java 21 Setup (Important)
Installed JDK Path Used
C:\Program Files\Eclipse Adoptium\jdk-21.0.9.10-hotspot

Force Gradle to use Java 21

//Open:

android/gradle.properties


//Add:

org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.9.10-hotspot

//This avoids conflicts with other Java versions.



Installation (First Time)
git clone https://github.com/Git389/High_level_app.git
cd High_level_app
npm install

Run in Browser (Development)
ionic serve


App runs on:

http://localhost:8100

Android Setup (Capacitor)

If Android platform is not added:

npx cap add android


Sync web code to Android:

ionic build
npx cap sync android


Run on Real Android Phone (Live Reload)

Enable USB debugging on your phone and connect it via USB.

ionic capacitor run android -l --external


This allows:

Running the app directly on phone

Live reload during development

Build APK (Install Manually)
ionic build
npx cap sync android
cd android
./gradlew assembleDebug


APK location:

android/app/build/outputs/apk/debug/app-debug.apk


Copy this APK to your phone and install it.

UI Consistency on Phone

Page-level SCSS (page-wrapper) is used to ensure:

Large top padding (status bar safe)





Large bottom padding (navigation bar safe)

This avoids UI issues on real Android devices.

Light theme is enforced to avoid dark-mode contrast issues.

```

<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/621e71fd-f3c1-46e0-b4d1-343e0a2abe51" />
<img width="373" height="767" alt="image" src="https://github.com/user-attachments/assets/56ced082-7684-471c-917d-cdc3c86900cb" />

<img width="385" height="772" alt="image" src="https://github.com/user-attachments/assets/8d5cc9fd-b525-4275-83e0-c2cd493c3773" />
<img width="390" height="769" alt="image" src="https://github.com/user-attachments/assets/38b6a49c-d594-4947-9f39-7278614b80f4" />
<img width="388" height="760" alt="image" src="https://github.com/user-attachments/assets/c2398ea8-d08b-41f1-a8ec-69a311b48fd9" />
<img width="379" height="762" alt="image" src="https://github.com/user-attachments/assets/65a6ca9c-ee0b-4bae-a976-67d48b620607" />
<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/9a7bdbe9-b104-4c3e-9332-be2a2b316d85" />
<img width="1920" height="986" alt="image" src="https://github.com/user-attachments/assets/d713bda3-7f23-4452-aef9-32126cb537d1" />
<img width="1920" height="947" alt="image" src="https://github.com/user-attachments/assets/27a55b6b-0ce6-4122-85ef-07c03a50799b" />
