/**
 * =========================================================================
 * ⚓ KICK OFF 2026 - AIESEC IN MEDINA | GOOGLE APPS SCRIPT WEB APP CONNECTOR
 * =========================================================================
 * 
 * This Google Apps Script receives registrations from the pirate-themed
 * Kick Off website and appends them as new rows in your Google Sheet.
 *
 * COLUMNS CREATED AUTOMATICALLY:
 * 1. Timestamp
 * 2. Full Name
 * 3. Email
 * 4. Phone
 * 5. CIN
 * 6. Allergies
 * 7. Position
 * 8. Department
 *
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new) and name it "Kick Off Medina 2026 Registrations".
 * 2. In Google Sheets menu, click: Extensions -> Apps Script.
 * 3. Delete any default code in the editor, and paste this ENTIRE file.
 * 4. Click the "Save" (💾) icon at the top.
 * 5. Click "Deploy" (top right) -> "New deployment".
 * 6. Click the gear icon (⚙️) next to "Select type" and choose "Web app".
 * 7. Fill in:
 *    - Description: "Kick Off Registrations"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (IMPORTANT: must be "Anyone", NOT "Only myself")
 * 8. Click "Deploy".
 * 9. Authorize access if prompted (click Advanced -> Go to Untitled project / Allow).
 * 10. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 11. Paste that URL into your website's app.js file in GOOGLE_SHEET_URL!
 * =========================================================================
 */

function doPost(e) {
  // Use a lock to prevent concurrent submissions from overwriting rows
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Phone",
        "CIN",
        "Allergies",
        "Position",
        "Department"
      ]);
      
      // Style header row (Gold pirate feel)
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#0a192f");
      headerRange.setFontColor("#d4a017");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Parse the incoming data (supports JSON, URL-encoded form data, and raw parameters)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback if sent as url-encoded string
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-GB", { timeZone: "Africa/Tunis" });
    var fullName = data.fullName || data["Full Name"] || "";
    var email = data.email || data["Email"] || "";
    var phone = data.phone || data["Phone"] || "";
    var cin = data.cin || data["CIN"] || "";
    var allergies = data.allergies || data["Allergies"] || "None";
    var position = data.position || data["Position"] || "";
    var department = data.department || data["Department"] || "";

    // Append to sheet
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      cin,
      allergies,
      position,
      department
    ]);

    // Format phone and CIN as plain text so leading zeros aren't dropped
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 4).setNumberFormat("@"); // Phone
    sheet.getRange(lastRow, 5).setNumberFormat("@"); // CIN

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Welcome aboard, " + fullName + "! ⚓",
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Simple test function to test directly in Google Apps Script editor
function testDoPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString(),
        fullName: "Captain Jack Sparrow",
        email: "jack@blackpearl.sea",
        phone: "+216 99123456",
        cin: "12345678",
        allergies: "Rum deficiency",
        position: "Team Leader",
        department: "OGV"
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
