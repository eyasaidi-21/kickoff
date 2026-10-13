// Generate a tense, epic, cinematic pirate adventure soundtrack
const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const bpm = 126;
const beatSec = 60 / bpm; // ~0.476 sec
const barSec = beatSec * 4; // ~1.90 sec
const totalBars = 8; // ~15.2 seconds seamless loop
const totalSec = totalBars * barSec;
const totalSamples = Math.floor(sampleRate * totalSec);

// Stereo buffers
const leftBuffer = new Float32Array(totalSamples);
const rightBuffer = new Float32Array(totalSamples);

// Helpers
function addSample(buffer, index, value) {
  if (index >= 0 && index < buffer.length) {
    buffer[index] += value;
  }
}

// 1. LAYER 1: Deep War Drums (Taiko / Cannon Kick on strong beats)
for (let bar = 0; bar < totalBars; bar++) {
  const barStart = Math.floor(bar * barSec * sampleRate);
  
  // Kick hits on 0, 1.5, 2.5, 3.5 beats (intense cinematic rhythm)
  const drumBeats = [0, 0.75, 1.5, 2.25, 3.0, 3.5];
  drumBeats.forEach((b, idx) => {
    const hitSample = barStart + Math.floor(b * beatSec * sampleRate);
    const isHeavy = (idx === 0 || idx === 4);
    const drumLen = Math.floor(sampleRate * (isHeavy ? 0.6 : 0.3));
    const startFreq = isHeavy ? 130 : 160;
    const endFreq = isHeavy ? 35 : 45;

    for (let s = 0; s < drumLen; s++) {
      const t = s / sampleRate;
      const progress = s / drumLen;
      const freq = startFreq * Math.exp(-progress * 8) + endFreq;
      const env = Math.exp(-progress * (isHeavy ? 6 : 9));
      
      // Drum fundamental + punch
      const wave = Math.sin(2 * Math.PI * freq * t) * env * (isHeavy ? 0.45 : 0.28);
      // Noise burst for drum skin impact
      const noise = (Math.random() * 2 - 1) * Math.exp(-s / (sampleRate * 0.02)) * 0.15;
      
      addSample(leftBuffer, hitSample + s, wave + noise);
      addSample(rightBuffer, hitSample + s, wave + noise);
    }
  });

  // Snare / Rattle march on 16th notes (tense galloping rhythm)
  for (let sixteenth = 0; sixteenth < 16; sixteenth++) {
    const sHit = barStart + Math.floor((sixteenth / 4) * beatSec * sampleRate);
    const snareLen = Math.floor(sampleRate * 0.08);
    const vol = (sixteenth % 4 === 2) ? 0.22 : 0.08;
    for (let s = 0; s < snareLen; s++) {
      const n = (Math.random() * 2 - 1) * Math.exp(-s / (sampleRate * 0.03)) * vol;
      addSample(leftBuffer, sHit + s, n * 0.9);
      addSample(rightBuffer, sHit + s, n * 1.1);
    }
  }
}

// 2. LAYER 2: Tense Galloping Bassline (D-minor ostinato)
// Notes: D1=36.7Hz, D2=73.4Hz, F2=87.3Hz, G2=98.0Hz, A2=110.0Hz, Bb2=116.5Hz
const bassNotesByBar = [
  73.42, 73.42, // Bar 1-2: Dm
  87.31, 87.31, // Bar 3-4: F
  98.00, 110.00, // Bar 5-6: G -> A
  116.54, 73.42  // Bar 7-8: Bb -> Dm
];

for (let bar = 0; bar < totalBars; bar++) {
  const rootFreq = bassNotesByBar[bar];
  const barStart = Math.floor(bar * barSec * sampleRate);

  // Galloping triplets: 8 hits per bar (da-da-da DUM da-da-da DUM)
  for (let beat = 0; beat < 8; beat++) {
    const noteStart = barStart + Math.floor((beat / 2) * beatSec * sampleRate);
    const noteLen = Math.floor(sampleRate * 0.22);

    for (let s = 0; s < noteLen; s++) {
      const t = s / sampleRate;
      const env = Math.exp(-s / (sampleRate * 0.12));
      // Sawtooth wave synthesized with harmonics
      let wave = 0;
      for (let h = 1; h <= 6; h++) {
        wave += (1 / h) * Math.sin(2 * Math.PI * (rootFreq * h) * t);
      }
      wave *= env * 0.22;
      addSample(leftBuffer, noteStart + s, wave);
      addSample(rightBuffer, noteStart + s, wave);
    }
  }
}

// 3. LAYER 3: Epic Brass Horn Fanfare Melody (Tense pirate combat theme)
// Frequencies
const N = {
  D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
  D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00
};

// Melody tuples: [pitch, beatStartInTotalBars, durationInBeats]
const melodyNotes = [
  // Motif 1 (Bars 0-2)
  [N.D4, 0.0, 0.5], [N.D4, 0.5, 0.5], [N.D4, 1.0, 0.5], [N.E4, 1.5, 0.5],
  [N.F4, 2.0, 1.0], [N.F4, 3.0, 0.5], [N.G4, 3.5, 0.5],
  [N.E4, 4.0, 1.2], [N.D4, 5.5, 0.5], [N.C4, 6.0, 0.5], [N.D4, 6.5, 1.5],

  // Motif 2 (Bars 2-4) Rising tension
  [N.D4, 8.0, 0.5], [N.D4, 8.5, 0.5], [N.F4, 9.0, 0.5], [N.G4, 9.5, 0.5],
  [N.A4, 10.0, 1.0], [N.A4, 11.0, 0.5], [N.Bb3 * 2, 11.5, 0.5],
  [N.A4, 12.0, 1.0], [N.G4, 13.0, 0.5], [N.F4, 13.5, 0.5], [N.G4, 14.0, 1.8],

  // Climax Stabs (Bars 4-6)
  [N.A4, 16.0, 0.75], [N.G4, 17.0, 0.75], [N.F4, 18.0, 0.75], [N.E4, 19.0, 0.75],
  [N.F4, 20.0, 0.5], [N.G4, 20.5, 0.5], [N.A4, 21.0, 1.0], [N.D4, 22.0, 1.8],

  // Resolving Swashbuckling Run (Bars 6-8)
  [N.Bb3 * 2, 24.0, 0.75], [N.A4, 25.0, 0.75], [N.G4, 26.0, 0.5], [N.F4, 26.5, 0.5],
  [N.E4, 27.0, 1.0], [N.C4, 28.0, 0.5], [N.E4, 28.5, 0.5], [N.D4, 29.0, 2.5]
];

melodyNotes.forEach(([freq, beatStart, durBeats]) => {
  const startSample = Math.floor(beatStart * beatSec * sampleRate);
  const noteDuration = Math.floor(durBeats * beatSec * sampleRate);

  for (let s = 0; s < noteDuration; s++) {
    const t = s / sampleRate;
    // Attack-Decay-Sustain-Release envelope
    let env = 1.0;
    const attackSamples = Math.floor(0.04 * sampleRate);
    const releaseSamples = Math.floor(0.12 * sampleRate);
    if (s < attackSamples) {
      env = s / attackSamples;
    } else if (s > noteDuration - releaseSamples) {
      env = (noteDuration - s) / releaseSamples;
    }

    // Fat detuned brass oscillators (unison with +/- 3 cents)
    const f1 = freq;
    const f2 = freq * 1.004;
    const f3 = freq * 0.996;

    let saw1 = 0, saw2 = 0, saw3 = 0;
    for (let h = 1; h <= 8; h++) {
      const harmWeight = 1 / (h * 0.85);
      saw1 += harmWeight * Math.sin(2 * Math.PI * (f1 * h) * t);
      saw2 += harmWeight * Math.sin(2 * Math.PI * (f2 * h) * t);
      saw3 += harmWeight * Math.sin(2 * Math.PI * (f3 * h) * t);
    }

    const brass = (saw1 * 0.4 + saw2 * 0.3 + saw3 * 0.3) * env * 0.28;
    addSample(leftBuffer, startSample + s, brass * 0.9);
    addSample(rightBuffer, startSample + s, brass * 1.1);
  }
});

// 4. LAYER 4: Sea storm wind / ocean ambiance (pink noise breeze)
let b0 = 0, b1 = 0, b2 = 0;
for (let s = 0; s < totalSamples; s++) {
  const white = Math.random() * 2 - 1;
  b0 = 0.99 * b0 + white * 0.05;
  b1 = 0.96 * b1 + white * 0.08;
  b2 = 0.88 * b2 + white * 0.12;
  const pink = (b0 + b1 + b2) * 0.035;
  // Slow modulation like sea swell
  const swell = 0.5 + 0.5 * Math.sin((2 * Math.PI * s) / (sampleRate * 4));
  addSample(leftBuffer, s, pink * swell);
  addSample(rightBuffer, s, pink * (1 - swell));
}

// 5. Master compression & Soft limiter
for (let s = 0; s < totalSamples; s++) {
  leftBuffer[s] = Math.tanh(leftBuffer[s] * 1.35) * 0.92;
  rightBuffer[s] = Math.tanh(rightBuffer[s] * 1.35) * 0.92;
}

// 6. Encode 16-bit PCM WAV File
const wavHeader = Buffer.alloc(44);
const dataSize = totalSamples * 4; // 2 channels * 2 bytes
const fileSize = 36 + dataSize;

// RIFF header
wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(fileSize, 4);
wavHeader.write('WAVE', 8);

// fmt chunk
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16); // subchunk1 size
wavHeader.writeUInt16LE(1, 20); // PCM
wavHeader.writeUInt16LE(2, 22); // stereo
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * 4, 28); // byte rate
wavHeader.writeUInt16LE(4, 32); // block align
wavHeader.writeUInt16LE(16, 34); // bits per sample

// data chunk
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(dataSize, 40);

const pcmData = Buffer.alloc(dataSize);
let offset = 0;
for (let s = 0; s < totalSamples; s++) {
  const l = Math.max(-1, Math.min(1, leftBuffer[s]));
  const r = Math.max(-1, Math.min(1, rightBuffer[s]));
  pcmData.writeInt16LE(Math.floor(l * 32767), offset);
  pcmData.writeInt16LE(Math.floor(r * 32767), offset + 2);
  offset += 4;
}

const finalBuffer = Buffer.concat([wavHeader, pcmData]);
const targetPath = path.join(__dirname, 'assets', 'pirates-theme.mp3');
fs.writeFileSync(targetPath, finalBuffer);

console.log(`Generated tense epic pirate soundtrack at ${targetPath} (${(finalBuffer.length / 1024 / 1024).toFixed(2)} MB, duration: ${totalSec.toFixed(1)}s)`);
