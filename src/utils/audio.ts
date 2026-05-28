/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio ASMR Synthesizer
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let bgGain: GainNode | null = null;

// Background ambient synthesizers
let windNoiseSource: AudioWorkletNode | ScriptProcessorNode | null = null;
let rainInterval: number | null = null;
let ambientOsc: OscillatorNode | null = null;
let ambientLFO: OscillatorNode | null = null;

let isMutedSetting = false;

// Create white noise buffer
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2; // 2 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Pink noise filtration algorithm (Vos-McCartney)
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    data[i] = pink * 0.11; // Soft pink noise
  }
  return buffer;
}

export function initAudioContext() {
  if (audioCtx) return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  audioCtx = new AudioContextClass();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(isMutedSetting ? 0 : 0.2, audioCtx.currentTime); // Low volume overall (gentle ambient ceiling)
  masterGain.connect(audioCtx.destination);

  bgGain = audioCtx.createGain();
  bgGain.gain.setValueAtTime(0.3, audioCtx.currentTime); // 30% of master for cozy background noise
  bgGain.connect(masterGain);
}

export function startBackgroundASMR() {
  initAudioContext();
  if (!audioCtx || !bgGain) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  try {
    // 1. Cozy Wind/Breeze generator
    const windBuffer = createNoiseBuffer(audioCtx);
    const windSource = audioCtx.createBufferSource();
    windSource.buffer = windBuffer;
    windSource.loop = true;

    // Filter to shape wind sound (resonant lowpass filter modulated by a very slow LFO)
    const windFilter = audioCtx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.Q.setValueAtTime(4.0, audioCtx.currentTime);
    windFilter.frequency.setValueAtTime(280, audioCtx.currentTime);

    // Speed of wind swell (LFO)
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, audioCtx.currentTime); // Slower than normal breathing

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(140, audioCtx.currentTime); // sweeping filter between 140Hz and 420Hz

    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    
    windSource.connect(windFilter);
    windFilter.connect(bgGain);

    windSource.start(0);
    lfo.start(0);

    // Save references to stop later
    const legacyProcessor = windSource as any;
    windNoiseSource = legacyProcessor;
    ambientOsc = lfo as any; // Storing as any for cleanup
    ambientLFO = lfo;

    // 2. Continuous soft drops/crinkles to simulate gentle forest rain droplets (infrequent, extremely warm popping)
    rainInterval = window.setInterval(() => {
      if (!audioCtx || !bgGain || isMutedSetting) return;
      
      // Randomly spawn a tiny, extremely soft water drop or crinkle
      const dropTime = audioCtx.currentTime;
      // High-pass dynamic click
      const clickOsc = audioCtx.createOscillator();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(400 + Math.random() * 800, dropTime);
      clickOsc.frequency.exponentialRampToValueAtTime(80, dropTime + 0.08);

      const clickGain = audioCtx.createGain();
      clickGain.gain.setValueAtTime(0.015 * Math.random(), dropTime); // very quiet
      clickGain.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.08);

      clickOsc.connect(clickGain);
      clickGain.connect(bgGain);

      clickOsc.start(dropTime);
      clickOsc.stop(dropTime + 0.09);
    }, 280);

  } catch (error) {
    console.warn("ASMR synthesiser background node failed to build:", error);
  }
}

export function stopBackgroundASMR() {
  if (windNoiseSource) {
    try {
      (windNoiseSource as any).stop();
    } catch (e) {}
    windNoiseSource = null;
  }
  if (ambientLFO) {
    try {
      ambientLFO.stop();
    } catch (e) {}
    ambientLFO = null;
  }
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }
}

// 1. Soft chime for hovering (frosted glass friction rubbing)
export function playHoverSound() {
  initAudioContext();
  if (!audioCtx || !masterGain || isMutedSetting) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  
  // Creates an exquisitely quiet, beautiful crystal chime
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  
  osc1.type = 'sine';
  osc2.type = 'triangle';

  // Harmonics (gentle interval - perfect fifth)
  const baseFreq = 650 + Math.random() * 30;
  osc1.frequency.setValueAtTime(baseFreq, now);
  osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.setValueAtTime(8, now);
  filter.frequency.setValueAtTime(2200, now);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.008, now); // Super silent, whispering chime
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  osc1.start(now);
  osc2.start(now);
  
  osc1.stop(now + 0.6);
  osc2.stop(now + 0.6);
}

// 2. Cozy mallet click (for buttons/key clicks - like high-quality organic wood/bubble interaction)
export function playClickSound() {
  initAudioContext();
  if (!audioCtx || !masterGain || isMutedSetting) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.setValueAtTime(5, now);
  bandpass.frequency.setValueAtTime(700, now);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.03, now); // soft popup click
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.06);
}

// 3. Gentle wind whoosh for tab/category transitioning
export function playTransitionSound() {
  initAudioContext();
  if (!audioCtx || !masterGain || isMutedSetting) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  
  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = createNoiseBuffer(audioCtx);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.setValueAtTime(1.5, now);
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(350, now + 0.6);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.015, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  noiseSource.start(now);
  noiseSource.stop(now + 0.8);
}

// 4. Exquisite shimmering glass bell sequence on success (unlocked details!)
export function playUnlockSound() {
  initAudioContext();
  if (!audioCtx || !masterGain || isMutedSetting) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  
  // Create 4 delicate overlapping tinkles at rising intervals (chords: Major 7th arpeggio)
  const notes = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5
  
  notes.forEach((freq, idx) => {
    const triggerTime = now + (idx * 0.12);
    
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, triggerTime);
    
    // Slight vibrato
    const vibrato = audioCtx.createOscillator();
    const vibratoGain = audioCtx.createGain();
    vibrato.frequency.setValueAtTime(8, triggerTime);
    vibratoGain.gain.setValueAtTime(4, triggerTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, triggerTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0, triggerTime);
    gain.gain.linearRampToValueAtTime(0.018, triggerTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, triggerTime + 0.82);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain!);

    vibrato.start(triggerTime);
    osc.start(triggerTime);
    
    vibrato.stop(triggerTime + 0.9);
    osc.stop(triggerTime + 0.9);
  });
}

export function setMuted(muted: boolean) {
  isMutedSetting = muted;
  if (masterGain && audioCtx) {
    const targetGain = muted ? 0 : 0.2;
    masterGain.gain.setValueAtTime(targetGain, audioCtx.currentTime);
  }
}

export function isAudioRunning(): boolean {
  return windNoiseSource !== null;
}
