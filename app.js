/**
 * =========================================================================
 * ⚓ KICK OFF 2026 - AIESEC IN MEDINA | PIRATES OF THE CARIBBEAN THEME
 * =========================================================================
 */

// -------------------------------------------------------------------------
// 1. 📊 GOOGLE APPS SCRIPT WEB APP URL (Single variable to change easily!)
// -------------------------------------------------------------------------
// Paste your deployed Google Apps Script Web App URL below:
// (See README.md or google-apps-script.js for 1-minute setup instructions)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwiSKunlyVzmnUq95CX9u5e8Hb9JtW0jykkCl4irDy5SgRWrLjNSnRJxS1RZ1N0xq8N/exec";


// -------------------------------------------------------------------------
// 2. 🗓️ LIVE COUNTDOWN TIMER (Target: October 23, 2026 at 09:00 AM)
// -------------------------------------------------------------------------
const TARGET_DATE = new Date("2026-10-23T09:00:00+01:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (distance < 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();


// -------------------------------------------------------------------------
// 3. 🎵 AUDIO SYSTEM (MP3 Playback + Web Audio API Pirate Shanty Fallback)
// -------------------------------------------------------------------------
const audioEl = document.getElementById("pirate-audio");
const floatingAudioBtn = document.getElementById("floating-audio-btn");
const audioIcon = document.getElementById("audio-icon");
let isAudioPlaying = false;
let isAudioMuted = false;
let synthAudioContext = null;
let isSynthPlaying = false;

// Tense, Cinematic Pirate Adventure Synthesizer (War Drums + Galloping Ostinato + Brass Stabs)
function startPirateSynthShanty() {
  if (isSynthPlaying) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    synthAudioContext = new AudioCtx();
    isSynthPlaying = true;

    const tempo = 126;
    const beatSec = 60 / tempo;
    const stepSec = beatSec / 2; // 8th note steps
    let step = 0;

    // Driving D-minor bassline notes
    const bassline = [
      73.42, 73.42, 73.42, 73.42, 87.31, 87.31, 98.00, 110.00,
      73.42, 73.42, 73.42, 73.42, 116.54, 110.00, 98.00, 87.31
    ];

    // Epic brass fanfare chords/notes (D minor heroic motif)
    const brassMotif = [
      293.66, 0, 293.66, 0, 349.23, 0, 392.00, 0,
      440.00, 0, 440.00, 0, 466.16, 392.00, 440.00, 0,
      349.23, 0, 329.63, 0, 293.66, 0, 261.63, 0,
      293.66, 293.66, 293.66, 0, 349.23, 392.00, 440.00, 0
    ];

    function scheduleTenseAdventure() {
      if (!isSynthPlaying || isAudioMuted || !synthAudioContext) return;
      const now = synthAudioContext.currentTime;

      // 1. Deep War Drum (Taiko Kick) every 2 beats
      if (step % 4 === 0) {
        const drumOsc = synthAudioContext.createOscillator();
        const drumGain = synthAudioContext.createGain();
        drumOsc.frequency.setValueAtTime(140, now);
        drumOsc.frequency.exponentialRampToValueAtTime(38, now + 0.35);
        drumGain.gain.setValueAtTime(0.35, now);
        drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        drumOsc.connect(drumGain);
        drumGain.connect(synthAudioContext.destination);
        drumOsc.start(now);
        drumOsc.stop(now + 0.36);
      }

      // 2. Galloping Snare/Percussion March on 8th notes
      if (step % 2 === 1) {
        const snareNoise = synthAudioContext.createBufferSource();
        const buffer = synthAudioContext.createBuffer(1, synthAudioContext.sampleRate * 0.05, synthAudioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        snareNoise.buffer = buffer;
        const snareGain = synthAudioContext.createGain();
        snareGain.gain.setValueAtTime(0.09, now);
        snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        snareNoise.connect(snareGain);
        snareGain.connect(synthAudioContext.destination);
        snareNoise.start(now);
      }

      // 3. Tense Galloping Bass (Low Sawtooth Ostinato)
      const bassFreq = bassline[step % bassline.length];
      const bassOsc = synthAudioContext.createOscillator();
      const bassGain = synthAudioContext.createGain();
      const bassFilter = synthAudioContext.createBiquadFilter();
      bassOsc.type = "sawtooth";
      bassOsc.frequency.setValueAtTime(bassFreq, now);
      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(450, now);
      bassGain.gain.setValueAtTime(0.18, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + stepSec * 0.85);
      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(synthAudioContext.destination);
      bassOsc.start(now);
      bassOsc.stop(now + stepSec * 0.9);

      // 4. Epic Brass Fanfare (Detuned Unison)
      const brassFreq = brassMotif[step % brassMotif.length];
      if (brassFreq > 0) {
        [-4, 4].forEach(cents => {
          const brassOsc = synthAudioContext.createOscillator();
          const brassGain = synthAudioContext.createGain();
          const brassFilter = synthAudioContext.createBiquadFilter();
          brassOsc.type = "sawtooth";
          brassOsc.frequency.setValueAtTime(brassFreq * Math.pow(2, cents / 1200), now);
          brassFilter.type = "lowpass";
          brassFilter.frequency.setValueAtTime(1100, now);
          brassGain.gain.setValueAtTime(0.08, now);
          brassGain.gain.exponentialRampToValueAtTime(0.001, now + stepSec * 1.5);
          brassOsc.connect(brassFilter);
          brassFilter.connect(brassGain);
          brassGain.connect(synthAudioContext.destination);
          brassOsc.start(now);
          brassOsc.stop(now + stepSec * 1.6);
        });
      }

      step++;
      setTimeout(scheduleTenseAdventure, stepSec * 1000);
    }

    scheduleTenseAdventure();
  } catch (err) {
    console.warn("Synth audio error:", err);
  }
}

function stopPirateSynthShanty() {
  isSynthPlaying = false;
  if (synthAudioContext && synthAudioContext.state !== "closed") {
    try { synthAudioContext.close(); } catch (e) { }
  }
}

function playPirateMusic() {
  if (audioEl) {
    audioEl.volume = 0.7;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioPlaying = true;
          updateAudioButtonUI(true);
        })
        .catch((err) => {
          console.log("MP3 autoplay failed or file empty; activating synth fallback shanty:", err);
          startPirateSynthShanty();
          isAudioPlaying = true;
          updateAudioButtonUI(true);
        });
    }
  } else {
    startPirateSynthShanty();
  }
}

function toggleAudio() {
  isAudioMuted = !isAudioMuted;
  if (audioEl) {
    audioEl.muted = isAudioMuted;
  }
  updateAudioButtonUI(!isAudioMuted);
}

function updateAudioButtonUI(active) {
  if (!floatingAudioBtn || !audioIcon) return;
  if (active && !isAudioMuted) {
    floatingAudioBtn.classList.remove("muted");
    audioIcon.textContent = "🔊";
  } else {
    floatingAudioBtn.classList.add("muted");
    audioIcon.textContent = "🔇";
  }
}

floatingAudioBtn?.addEventListener("click", toggleAudio);


// -------------------------------------------------------------------------
// 4. ⚓ INTRO SCREEN INTERACTION ("⚓ Board the Ship")
// -------------------------------------------------------------------------
const introScreen = document.getElementById("intro-screen");
const boardShipBtn = document.getElementById("board-ship-btn");

// Ensure browser starts at top of page and does not auto-restore past scroll positions
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

if (boardShipBtn) {
  boardShipBtn.addEventListener("click", () => {
    // 1. Force scroll position to the very top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }

    // 2. Hide intro screen with smooth transition
    if (introScreen) {
      introScreen.classList.add("hidden");
    }

    // 3. Ensure top hero section is in view
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "instant", block: "start" });
    }

    // 4. Play music on loop
    playPirateMusic();
  });
}


// -------------------------------------------------------------------------
// 5. 🪙 FALLING GOLD COINS CANVAS (Background Atmosphere)
// -------------------------------------------------------------------------
const canvas = document.getElementById("coins-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const COIN_COUNT = window.innerWidth < 640 ? 18 : 36;
  const coins = [];

  for (let i = 0; i < COIN_COUNT; i++) {
    coins.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 7 + 6,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      scaleY: Math.random() * 0.8 + 0.2,
      scaleYDelta: (Math.random() * 0.03 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
      opacity: Math.random() * 0.5 + 0.35
    });
  }

  function drawCoins() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < coins.length; i++) {
      const c = coins[i];
      c.y += c.speedY;
      c.x += c.speedX;
      c.rotation += c.rotationSpeed;
      c.scaleY += c.scaleYDelta;

      if (c.scaleY > 1 || c.scaleY < 0.15) {
        c.scaleYDelta = -c.scaleYDelta;
      }

      if (c.y > height + 20) {
        c.y = -20;
        c.x = Math.random() * width;
      }
      if (c.x > width + 20) c.x = -20;
      if (c.x < -20) c.x = width + 20;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);
      ctx.scale(1, c.scaleY);
      ctx.globalAlpha = c.opacity;

      // Outer Gold Rim
      ctx.beginPath();
      ctx.arc(0, 0, c.size, 0, Math.PI * 2);
      ctx.fillStyle = "#d4a017";
      ctx.fill();

      // Inner Gold Face
      ctx.beginPath();
      ctx.arc(0, 0, c.size * 0.82, 0, Math.PI * 2);
      ctx.fillStyle = "#f3c042";
      ctx.fill();

      // Pirate Skull / Cross Stamping inside coin
      ctx.beginPath();
      ctx.arc(0, 0, c.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#916802";
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(drawCoins);
  }

  drawCoins();
}


// -------------------------------------------------------------------------
// 6. 📜 REGISTRATION FORM VALIDATION & GOOGLE SHEETS SUBMISSION
// -------------------------------------------------------------------------
const form = document.getElementById("registration-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");
const formAlert = document.getElementById("form-alert");

// Success Modal Elements
const successModal = document.getElementById("success-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalSailorName = document.getElementById("modal-sailor-name");
const passName = document.getElementById("pass-name");
const passPosition = document.getElementById("pass-position");
const passDepartment = document.getElementById("pass-department");

// Helper to set field error
function setFieldError(fieldId, errorMsg) {
  const group = document.getElementById(`group-${fieldId}`);
  const errEl = document.getElementById(`error-${fieldId}`);
  if (group) group.classList.add("has-error");
  if (errEl) {
    errEl.textContent = errorMsg;
    errEl.classList.add("visible");
  }
}

// Helper to clear field error
function clearFieldError(fieldId) {
  const group = document.getElementById(`group-${fieldId}`);
  const errEl = document.getElementById(`error-${fieldId}`);
  if (group) group.classList.remove("has-error");
  if (errEl) {
    errEl.textContent = "";
    errEl.classList.remove("visible");
  }
}

// Clear all field errors
function clearAllErrors() {
  const fields = ["fullName", "email", "phone", "cin", "allergies", "position", "department", "photo"];
  fields.forEach(clearFieldError);
  if (formAlert) {
    formAlert.style.display = "none";
    formAlert.className = "form-alert";
  }
}

// Input auto-clearing and numeric sanitizer
["fullName", "email", "phone", "cin", "allergies", "position", "department"].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => clearFieldError(id));
    input.addEventListener("change", () => clearFieldError(id));
  }
});

// Sanitize Phone and CIN to numbers only
const phoneInput = document.getElementById("phone");
phoneInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
});

const cinInput = document.getElementById("cin");
cinInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
});

// Validate all form fields with Friendly Pirate Error Messages
function validateForm() {
  clearAllErrors();
  // 7. Photo
  const photoFile = document.getElementById("photo").files[0];
  if (!photoFile || !photoFile.type.startsWith("image/")) {
    setFieldError("photo", "📸 Arr! Upload a photo of yourself for the crew portrait.");
    isValid = false;
  } else if (photoFile.size > 15 * 1024 * 1024) {
    setFieldError("photo", "📸 That photo is too heavy for the ship! Max 15 MB.");
    isValid = false;
  }
  let isValid = true;

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const cin = document.getElementById("cin").value.trim();
  const position = document.getElementById("position").value;
  const department = document.getElementById("department").value;

  // 1. Full Name
  if (!fullName || fullName.length < 2) {
    setFieldError("fullName", "🏴 Ahoy matey! Please carve your full name onto the manifest.");
    isValid = false;
  }

  // 2. Email (Validated)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setFieldError("email", "✉️ Shiver me timbers! Enter a valid seafaring email address.");
    isValid = false;
  }

  // 3. Phone (Exactly 8 digits)
  if (!phone || phone.length !== 8 || !/^\d{8}$/.test(phone)) {
    setFieldError("phone", "📱 Blimey! Enter exactly 8 digits for your Tunisian phone number.");
    isValid = false;
  }

  // 4. CIN (Exactly 8 digits)
  if (!cin || cin.length !== 8 || !/^\d{8}$/.test(cin)) {
    setFieldError("cin", "🪪 By Blackbeard's ghost! Your CIN must be exactly 8 digits.");
    isValid = false;
  }

  // 5. Position Dropdown
  if (!position) {
    setFieldError("position", "🎖️ Avast! Select your crew rank aboard the ship.");
    isValid = false;
  }

  // 6. Department Dropdown
  if (!department) {
    setFieldError("department", "⚓ Declare your ship division, sailor!");
    isValid = false;
  }

  return isValid;
}

// Handle Form Submission
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll smoothly to first error
      const firstError = document.querySelector(".form-group.has-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Collect data
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const rawPhone = document.getElementById("phone").value.trim();
    const formattedPhone = `+216 ${rawPhone}`;
    const cin = document.getElementById("cin").value.trim();
    const allergies = document.getElementById("allergies").value.trim() || "None";
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Tunis" });

    const submissionData = {
      timestamp: timestamp,
      fullName: fullName,
      email: email,
      phone: formattedPhone,
      cin: cin,
      allergies: allergies,
      position: position,
      department: department
    };

    // 1. Enter Loading State (Prevent double submissions)
    submitBtn.disabled = true;
    btnSpinner.style.display = "inline-block";
    btnText.textContent = "⚓ Inscribing into Ship's Log...";

    try {
      submissionData.photo = await resizeImage(document.getElementById("photo").files[0]);
      // 2. Submit to Google Sheet Connector
      const isPlaceholderUrl = GOOGLE_SHEET_URL.includes("YOUR_SCRIPT_ID");

      if (isPlaceholderUrl) {
        // Helpful demo mode: Show warning banner and simulate local success
        console.warn(
          "⚠️ Google Apps Script URL has not been set yet in app.js.\n" +
          "Follow instructions in README.md or google-apps-script.js to deploy your web app and paste the URL into GOOGLE_SHEET_URL."
        );
        // Simulate quick network roundtrip
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        // Send POST request with mode 'no-cors' so browser won't throw CORS errors
        // Send as URL-encoded data or stringified payload
        const postBody = JSON.stringify(submissionData);

        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: postBody
        });
      }

      // 3. Show Success Modal: "Welcome aboard, [Name]! ⚓🏴☠️"
      showSuccessModal(fullName, position, department);
      form.reset();
      resetPhotoPreview();

    } catch (err) {
      console.error("Submission error:", err);
      if (formAlert) {
        formAlert.className = "form-alert alert-error";
        formAlert.textContent = "⚓ An ocean tempest disrupted your transmission! (" + (err && err.message ? err.message : err) + ")"; formAlert.style.display = "block";
      }
    } finally {
      // Restore submit button state
      submitBtn.disabled = false;
      btnSpinner.style.display = "none";
      btnText.textContent = "⚓ Sign & Join the Crew";
    }
  });
}

// Display Success Modal
function showSuccessModal(name, pos, dept) {
  if (!successModal) return;

  if (modalSailorName) modalSailorName.textContent = name;
  if (passName) passName.textContent = name;
  if (passPosition) passPosition.textContent = pos;
  if (passDepartment) passDepartment.textContent = dept;

  successModal.style.display = "flex";

  // Trigger sound effect or small coin burst
  triggerCoinBurst();
}

// Close Success Modal
function closeSuccessModal() {
  if (successModal) {
    successModal.style.display = "none";
  }
}

closeModalBtn?.addEventListener("click", closeSuccessModal);
modalBackdrop?.addEventListener("click", closeSuccessModal);

// Extra Gold Coin Burst on successful registration
function triggerCoinBurst() {
  const burstCount = 20;
  for (let i = 0; i < burstCount; i++) {
    const coin = document.createElement("div");
    coin.textContent = "🪙";
    coin.style.position = "fixed";
    coin.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
    coin.style.top = `${50 + (Math.random() - 0.5) * 30}%`;
    coin.style.fontSize = `${Math.random() * 20 + 20}px`;
    coin.style.zIndex = "3000";
    coin.style.pointerEvents = "none";
    coin.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
    document.body.appendChild(coin);

    requestAnimationFrame(() => {
      coin.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${Math.random() * 250 + 100}px) rotate(${Math.random() * 720}deg)`;
      coin.style.opacity = "0";
    });

    setTimeout(() => coin.remove(), 1300);
  }
  // ---------- PHOTO UPLOAD ----------
  const photoInput = document.getElementById("photo");
  const photoPreview = document.getElementById("photo-preview");

  photoInput?.addEventListener("change", () => {
    clearFieldError("photo");
    const file = photoInput.files[0];
    if (file && file.type.startsWith("image/")) {
      photoPreview.src = URL.createObjectURL(file);
      photoPreview.style.display = "block";
    } else {
      photoPreview.style.display = "none";
    }
  });

  function resetPhotoPreview() {
    if (photoPreview) {
      photoPreview.style.display = "none";
      photoPreview.removeAttribute("src");
    }
  }

  // Shrinks the photo to max 600px and returns base64 text (keeps it small and fast)
  function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 600;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.75).split(",")[1]);
      };
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = url;
    });
  }
}
