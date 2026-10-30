// Procedural Web Audio API sound synthesis engine
// Zero external sound assets required

let ctx: AudioContext | null = null;
let bus: GainNode | null = null;
let soundEnabled = true;
let soundUnlocked = false;

function getAudioBus(): { ctx: AudioContext; bus: GainNode } | null {
  if (typeof window === "undefined" || !soundEnabled || !soundUnlocked) return null;
  if (!ctx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    ctx = new AudioContextClass();
    bus = ctx.createGain();
    bus.gain.value = 0.35;
    bus.connect(ctx.destination);
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return bus ? { ctx, bus } : null;
}

function tone(
  type: OscillatorType,
  freq: number,
  durationMs: number,
  gainVal: number,
  delaySec = 0,
  rampFreq?: number
) {
  const audio = getAudioBus();
  if (!audio) return;
  const startTime = audio.ctx.currentTime + delaySec;
  const osc = audio.ctx.createOscillator();
  const gain = audio.ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  if (rampFreq) {
    osc.frequency.exponentialRampToValueAtTime(rampFreq, startTime + durationMs / 1000);
  }

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationMs / 1000);

  osc.connect(gain);
  gain.connect(audio.bus);
  osc.start(startTime);
  osc.stop(startTime + durationMs / 1000 + 0.02);
}

export type SoundEffect = "tick" | "click" | "swish" | "chime";

export function play(effect: SoundEffect) {
  if (!soundEnabled) return;
  switch (effect) {
    case "tick":
      tone("sine", 320, 40, 0.012);
      break;
    case "click":
      tone("triangle", 520, 25, 0.02);
      break;
    case "swish": {
      const audio = getAudioBus();
      if (!audio) return;
      const sampleRate = audio.ctx.sampleRate;
      const samples = Math.floor((90 * sampleRate) / 1000);
      const buffer = audio.ctx.createBuffer(1, samples, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < samples; i++) {
        data[i] = (2 * Math.random() - 1) * (1 - i / samples);
      }
      const source = audio.ctx.createBufferSource();
      source.buffer = buffer;
      const filter = audio.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 0.7;
      const g = audio.ctx.createGain();
      g.gain.value = 0.035;
      source.connect(filter);
      filter.connect(g);
      g.connect(audio.bus);
      source.start();
      break;
    }
    case "chime":
      tone("sine", 660, 90, 0.02);
      tone("sine", 880, 120, 0.016, 0.075);
      break;
  }
}

export function initSound(): boolean {
  if (typeof window === "undefined") return true;
  soundEnabled = window.localStorage.getItem("sound") !== "off";
  return soundEnabled;
}

export function setSoundState(enabled: boolean) {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    window.localStorage.setItem("sound", enabled ? "on" : "off");
  }
  if (enabled) {
    unlockSound();
    play("click");
  }
}

export function isSoundActive(): boolean {
  return soundEnabled;
}

export function unlockSound() {
  if (soundUnlocked) return;
  soundUnlocked = true;
  if (typeof window !== "undefined" && !ctx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      ctx = new AudioContextClass();
      bus = ctx.createGain();
      bus.gain.value = 0.35;
      bus.connect(ctx.destination);
    }
  }
  if (ctx && ctx.state === "suspended") {
    ctx.resume();
  }
}

export function scrollTicker() {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let lastTime = 0;
  const onScroll = () => {
    const now = performance.now();
    if (now - lastTime < 160) return;
    lastTime = now;
    play("tick");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
