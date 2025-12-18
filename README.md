
# High-Level App – Ionic + Capacitor (Android)

<p align="center">
  <img alt="Ionic" src="https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=ionic&logoColor=white"/>
  <img alt="Angular" src="https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white"/>
  <img alt="Capacitor" src="https://img.shields.io/badge/Capacitor-%23119EFF.svg?style=for-the-badge&logo=capacitor&logoColor=white"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="Android" src="https://img.shields.io/badge/Android-%233DDC84.svg?style=for-the-badge&logo=android&logoColor=white"/>
  <img alt="Java" src="https://img.shields.io/badge/Java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/621e71fd-f3c1-46e0-b4d1-343e0a2abe51" alt="App Showcase" width="70%"/>
</p>

This project is a **college project** built using **Ionic (Angular)** and **Capacitor**. The goal is to demonstrate multiple **high-level mobile features** inside a single application that runs on both web browsers and as a native **Android APK**.

The app features a **tabs-based layout** and is designed to provide a consistent user experience on **real Android devices**.

---

## ✨ Features

- **Tabs-based navigation** (Tab1, Tab2, Tab3, etc.)
- **Camera** access
- **QR / Barcode** scanning
- **Text-to-Speech**
- **Speech-to-Text**
- **Geolocation** (GPS)
- **Open external websites** (Browser API)
- **Haptics**
- **Keyboard** handling
- **Local notifications**
- **Preferences** (local storage)
- **Status bar** control
- **Flashlight**
- **Multi-language support** (i18n)
- **Theme handling** (light mode enforced for consistency)

---

## 🛠️ Tech Stack

- **Ionic** (Angular)
- **Capacitor** (Android)
- **Node.js** + **npm**
- **Android Studio** + **Android SDK**
- **Java JDK 21** (required for Android build)
- **Git & GitHub** (version control)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js (LTS)**
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Git**
- **Android Studio** (with Android SDK + Platform Tools)
- **Java JDK 21** (mandatory for Android builds)

### Java 21 Setup (Important!)

To ensure Gradle uses the correct Java version, you need to set the `org.gradle.java.home` property in your `android/gradle.properties` file.

1.  **Open**: `android/gradle.properties`
2.  **Add**:
    ```properties
    org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.9.10-hotspot
    ```
    *(Replace with your actual JDK 21 path)*

This prevents conflicts with other Java versions installed on your system.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Git389/High_level_app.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd High_level_app
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

---

## 💻 Development

### Run in Browser

To run the app in your browser with live reload, use the following command:

```bash
ionic serve
```

The app will be available at `http://localhost:8100`.

### Android Setup (Capacitor)

1.  **Add the Android platform** (if not already added):
    ```bash
    npx cap add android
    ```
2.  **Sync your web code with the Android project**:
    ```bash
    ionic build
    npx cap sync android
    ```

### Run on a Real Android Device (Live Reload)

Enable USB debugging on your phone, connect it to your computer, and run:

```bash
ionic capacitor run android -l --external
```

This command allows you to:
- Run the app directly on your phone.
- Benefit from live reload during development.

---

## 📦 Build APK

To build a debug APK for manual installation:

1.  **Build the web assets**:
    ```bash
    ionic build
    ```
2.  **Sync with Capacitor**:
    ```bash
    npx cap sync android
    ```
3.  **Navigate to the Android directory**:
    ```bash
    cd android
    ```
4.  **Run the Gradle build**:
    ```bash
    ./gradlew assembleDebug
    ```

The APK will be located at `android/app/build/outputs/apk/debug/app-debug.apk`. You can copy this file to your phone and install it manually.

---

## 📱 UI Consistency

To ensure a consistent look and feel on real Android devices, the UI includes:

- **Large top padding** to avoid overlapping with the status bar.
- **Large bottom padding** to prevent interference with the navigation bar.

A **light theme** is enforced to avoid contrast issues that can arise with dark mode.

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/56ced082-7684-471c-917d-cdc3c86900cb" alt="Screenshot 1" width="30%"/>
  <img src="https://github.com/user-attachments/assets/8d5cc9fd-b525-4275-83e0-c2cd493c3773" alt="Screenshot 2" width="30%"/>
  <img src="https://github.com/user-attachments/assets/38b6a49c-d594-4947-9f39-7278614b80f4" alt="Screenshot 3" width="30%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/c2398ea8-d08b-41f1-a8ec-69a311b48fd9" alt="Screenshot 4" width="30%"/>
  <img src="https://github.com/user-attachments/assets/65a6ca9c-ee0b-4bae-a976-67d48b620607" alt="Screenshot 5" width="30%"/>
</p>

---

## 🧠 Challenges Faced During Project Development

### 1. UI Differences Between Browser and Android APK
**Issue:** The application worked correctly in the browser using `ionic serve`, but the layout behaved differently on a real Android device due to the system status bar and navigation bar.
**Learning:** We learned to manage safe spacing using page-level SCSS and proper padding.

### 2. Dark Mode Styling Issues
**Issue:** Android system dark mode automatically changed Ionic styles, causing text to appear white on light backgrounds.
**Learning:** We learned how Ionic detects system themes and how to enforce a consistent light theme.

### 3. API and Permission Issues
**Issue:** Capacitor APIs such as camera, speech recognition, and geolocation required explicit runtime permissions on Android.
**Learning:** We learned that mobile apps need permission handling beyond browser testing.

### 4. Java and Android Build Toolchain Issues
**Issue:** The Android build failed because Gradle required Java JDK 21 while a newer Java version was installed.
**Learning:** We learned the importance of correct toolchain versions and Gradle configuration.

### 5. Form State Binding Issues
**Issue:** Radio buttons and dropdowns displayed options but initially did not store user selections.
**Learning:** We learned to use Angular two-way data binding with `ngModel` correctly.

### 6. Managing Multiple Features in One App
**Issue:** Integrating many features into a single app made code organization challenging.
**Learning:** We learned modular design using tabs and separation of UI, logic, and styling.
