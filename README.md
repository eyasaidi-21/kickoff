# ⚓ KICK OFF 2026 - AIESEC in Medina
### Pirates of the Caribbean Themed Conference Registration Website

---

## 🏴☠️ Quick Start & Setup Guide

### 1. How to Run the Website Locally
You can open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari) by double-clicking it, or serve it using any local web server:
- Using Python: `python -m http.server 3000`
- Using Node.js (npx): `npx serve`
- Or using VS Code Live Server extension.

---

## 📊 Google Sheets Connection (doPost Web App)

Follow these simple steps to link all form registrations directly to your Google Sheet:

### Step 1: Create a Google Sheet
1. Open your browser and go to [https://sheets.new](https://sheets.new) (or Google Drive -> New Google Sheet).
2. Name the spreadsheet: **Kick Off Medina 2026 Registrations**.
*(The script will automatically create the styled header columns for you on first submission!)*

### Step 2: Open Apps Script Editor
1. In the top Google Sheets menu, click **Extensions** > **Apps Script**.
2. Delete whatever placeholder code appears in the editor window (`function myFunction() { ... }`).

### Step 3: Paste the Connector Script
1. Open [`google-apps-script.js`](file:///c:/Users/eyas2/OneDrive/Desktop/kickoff/google-apps-script.js) in this project.
2. Copy all the code and paste it into the Google Apps Script editor.
3. Click the **Save** (💾) icon at the top of the Apps Script toolbar.

### Step 4: Deploy as a Web App
1. In the top right corner of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (**Select type**) on the left side of the popup and select **Web app**.
3. Configure the 3 fields:
   - **Description**: `Kick Off Registrations Web App`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: You MUST choose "Anyone" so visitors can submit the form without logging into your Google account)*
4. Click **Deploy**.

### Step 5: Authorize Permissions
1. Google will ask for authorization to edit your sheet. Click **Authorize access**.
2. Choose your Google account.
3. If Google displays "Google hasn't verified this app", click **Advanced** (at the bottom), then click **Go to Untitled project (unsafe)**.
4. Click **Allow**.

### Step 6: Paste the URL into the Website
1. Copy the **Web app URL** that appears (looks like `https://script.google.com/macros/s/AKfycb.../exec`).
2. Open [`app.js`](file:///c:/Users/eyas2/OneDrive/Desktop/kickoff/app.js) in this project.
3. At the very top (line 12), replace the placeholder with your copied URL:
   ```javascript
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save [`app.js`](file:///c:/Users/eyas2/OneDrive/Desktop/kickoff/app.js). That's it! Every submission will now be saved in real time into your Google Sheet!

---

## 🎵 Music Setup
- Place your audio file at `assets/pirates-theme.mp3`.
- The website includes a full-screen intro screen with the glowing button **"⚓ Board the Ship"**. When clicked, it begins looping the music and smoothly transitions into the conference page.
- A floating speaker button at the top-right allows users to mute and unmute with one tap at any time.
- If no MP3 file is present or before you add one, an automatic Web Audio pirate melody synthesizer will play so you can preview sound immediately!

---

## 📋 Google Sheet Columns Recorded:
1. **Timestamp**: Exact submission date and time (Tunis time).
2. **Full Name**: Sailor's name.
3. **Email**: Seafarer's email.
4. **Phone**: 8-digit phone number with +216 prefix.
5. **CIN**: Exactly 8 digits.
6. **Allergies**: Dietary restrictions or "None".
7. **Position**: Newbie, Oldie, Manager, Team Leader.
8. **Department**: OGV, OGT, IGV, IGT, F&L, MKT, IM, BD, TM.
