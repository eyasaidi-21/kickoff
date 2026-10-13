// =========================================================
// KICK OFF 2026 - AIESEC IN MEDINA
// =========================================================

// 1. GOOGLE APPS SCRIPT WEB APP URL  <-- PASTE YOUR WORKING /exec URL HERE
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwiSKunlyVzmnUq95CX9u5e8Hb9JtW0jykkCl4irDy5SgRWrLjNSnRJxS1RZ1N0xq8N/exec";

// 2. COUNTDOWN (Target: October 23, 2026 at 09:00)
const TARGET_DATE = new Date("2026-10-23T09:00:00+01:00").getTime();

function updateCountdown() {
  const distance = TARGET_DATE - new Date().getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (distance < 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
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

// 3. AUDIO SYSTEM
const audioEl = document.getElementById("pirate-audio");
const floatingAudioBtn = document.getElementById("floating-audio-btn");
const audioIcon = document.getElementById("audio-icon");
let isAudioPlaying = false;
let isAudioMuted = false;
let synthAudioContext = null;
let isSynthPlaying = false;

function startPirateSynthShanty() {
  if (isSynthPlaying) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    synthAudioContext = new AudioCtx();
    isSynthPlaying = true;

    const tempo = 126;
    const beatSec = 60 / tempo;
    const stepSec = beatSec / 2;
    let step = 0;

    const bassline = [
      73.42, 73.42, 73.42, 73.42, 87.31, 87.31, 98.00, 110.00,
      73.42, 73.42, 73.42, 73.42, 116.54, 110.00, 98.00, 87.31
    ];
    const brassMotif = [
      293.66, 0, 293.66, 0, 349.23, 0, 392.00, 0,
      440.00, 0, 440.00, 0, 466.16, 392.00, 440.00, 0,
      349.23, 0, 329.63, 0, 293.66, 0, 261.63, 0,
      293.66, 293.66, 293.66, 0, 349.23, 392.00, 440.00, 0
    ];

    function scheduleTenseAdventure() {
      if (!isSynthPlaying || isAudioMuted || !synthAudioContext) return;
      const now = synthAudioContext.currentTime;

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
          console.log("MP3 failed; using synth fallback:", err);
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
  if (audioEl) audioEl.muted = isAudioMuted;
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

// 4. INTRO SCREEN
const introScreen = document.getElementById("intro-screen");
const boardShipBtn = document.getElementById("board-ship-btn");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

if (boardShipBtn) {
  boardShipBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
    if (introScreen) introScreen.classList.add("hidden");
    const heroSection = document.getElementById("hero-section");
    if (heroSection) heroSection.scrollIntoView({ behavior: "instant", block: "start" });
    playPirateMusic();
  });
}

// 5. FALLING GOLD COINS
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
      if (c.scaleY > 1 || c.scaleY < 0.15) c.scaleYDelta = -c.scaleYDelta;
      if (c.y > height + 20) { c.y = -20; c.x = Math.random() * width; }
      if (c.x > width + 20) c.x = -20;
      if (c.x < -20) c.x = width + 20;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);
      ctx.scale(1, c.scaleY);
      ctx.globalAlpha = c.opacity;
      ctx.beginPath(); ctx.arc(0, 0, c.size, 0, Math.PI * 2); ctx.fillStyle = "#d4a017"; ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, c.size * 0.82, 0, Math.PI * 2); ctx.fillStyle = "#f3c042"; ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, c.size * 0.4, 0, Math.PI * 2); ctx.fillStyle = "#916802"; ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(drawCoins);
  }
  drawCoins();
}

// 6. REGISTRATION FORM
const form = document.getElementById("registration-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");
const formAlert = document.getElementById("form-alert");

const successModal = document.getElementById("success-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalSailorName = document.getElementById("modal-sailor-name");
const passName = document.getElementById("pass-name");
const passPosition = document.getElementById("pass-position");
const passDepartment = document.getElementById("pass-department");

const FIELD_IDS = ["fullName", "email", "phone", "cin", "allergies", "position", "department", "photo", "payment"];

function setFieldError(fieldId, errorMsg) {
  const group = document.getElementById(`group-${fieldId}`);
  const errEl = document.getElementById(`error-${fieldId}`);
  if (group) group.classList.add("has-error");
  if (errEl) {
    errEl.textContent = errorMsg;
    errEl.classList.add("visible");
  }
}

function clearFieldError(fieldId) {
  const group = document.getElementById(`group-${fieldId}`);
  const errEl = document.getElementById(`error-${fieldId}`);
  if (group) group.classList.remove("has-error");
  if (errEl) {
    errEl.textContent = "";
    errEl.classList.remove("visible");
  }
}

function clearAllErrors() {
  FIELD_IDS.forEach(clearFieldError);
  if (formAlert) {
    formAlert.style.display = "none";
    formAlert.className = "form-alert";
  }
}

FIELD_IDS.forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => clearFieldError(id));
    input.addEventListener("change", () => clearFieldError(id));
  }
});

const phoneInput = document.getElementById("phone");
phoneInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
});

const cinInput = document.getElementById("cin");
cinInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
});

// ---------- PHOTO UPLOAD ----------
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");

photoInput?.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file && file.type.startsWith("image/")) {
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.display = "block";
  } else if (photoPreview) {
    photoPreview.style.display = "none";
  }
});

function resetPhotoPreview() {
  if (photoPreview) {
    photoPreview.style.display = "none";
    photoPreview.removeAttribute("src");
  }
}

// Shrinks the photo to max 600px and returns base64 text
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

function validateForm() {
  clearAllErrors();
  let isValid = true;

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const cin = document.getElementById("cin").value.trim();
  const position = document.getElementById("position").value;
  const department = document.getElementById("department").value;

  if (!fullName || fullName.length < 2) {
    setFieldError("fullName", "🏴 Ahoy matey! Please carve your full name onto the manifest.");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setFieldError("email", "✉️ Shiver me timbers! Enter a valid seafaring email address.");
    isValid = false;
  }

  if (!phone || !/^\d{8}$/.test(phone)) {
    setFieldError("phone", "📱 Blimey! Enter exactly 8 digits for your Tunisian phone number.");
    isValid = false;
  }

  if (!cin || !/^\d{8}$/.test(cin)) {
    setFieldError("cin", "🪪 By Blackbeard's ghost! Your CIN must be exactly 8 digits.");
    isValid = false;
  }

  if (!position) {
    setFieldError("position", "🎖️ Avast! Select your crew rank aboard the ship.");
    isValid = false;
  }

  if (!department) {
    setFieldError("department", "⚓ Declare your ship division, sailor!");
    isValid = false;
  }

  const photoFile = photoInput && photoInput.files[0];
  if (!photoFile || !photoFile.type.startsWith("image/")) {
    setFieldError("photo", "📸 Arr! Upload a photo of yourself for the crew portrait.");
    isValid = false;
  } else if (photoFile.size > 15 * 1024 * 1024) {
    setFieldError("photo", "📸 That photo is too heavy for the ship! Max 15 MB.");
    isValid = false;
  }
  const payBox = document.getElementById("payment");
  if (!payBox || !payBox.checked) {
    setFieldError("payment", "💰 Avast! You must pledge to pay the 150 TND fee before October 20, 2026.");
    isValid = false;
  }

  return isValid;
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".form-group.has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const rawPhone = document.getElementById("phone").value.trim();
    const cin = document.getElementById("cin").value.trim();
    const allergies = document.getElementById("allergies").value.trim() || "None";
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;

    const submissionData = {
      timestamp: new Date().toLocaleString("en-GB", { timeZone: "Africa/Tunis" }),
      fullName: fullName,
      email: email,
      phone: `+216 ${rawPhone}`,
      cin: cin,
      allergies: allergies,
      position: position,
      department: department
    };

    submitBtn.disabled = true;
    btnSpinner.style.display = "inline-block";
    btnText.textContent = "⚓ Inscribing into Ship's Log...";

    try {
      submissionData.photo = await resizeImage(photoInput.files[0]);

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(submissionData)
      });

      showSuccessModal(fullName, position, department);
      form.reset();
      resetPhotoPreview();

    } catch (err) {
      console.error("Submission error:", err);
      if (formAlert) {
        formAlert.className = "form-alert alert-error";
        formAlert.textContent = "⚓ An ocean tempest disrupted your transmission! (" + (err && err.message ? err.message : err) + ")";
        formAlert.style.display = "block";
      }
    } finally {
      submitBtn.disabled = false;
      btnSpinner.style.display = "none";
      btnText.textContent = "⚓ Sign & Join the Crew";
    }
  });
}

function showSuccessModal(name, pos, dept) {
  if (!successModal) return;
  if (modalSailorName) modalSailorName.textContent = name;
  if (passName) passName.textContent = name;
  if (passPosition) passPosition.textContent = pos;
  if (passDepartment) passDepartment.textContent = dept;
  successModal.style.display = "flex";
  triggerCoinBurst();
}

function closeSuccessModal() {
  if (successModal) successModal.style.display = "none";
}

closeModalBtn?.addEventListener("click", closeSuccessModal);
modalBackdrop?.addEventListener("click", closeSuccessModal);

function triggerCoinBurst() {
  for (let i = 0; i < 20; i++) {
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
}
