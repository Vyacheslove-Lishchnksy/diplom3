class RTTTLPlayer {
  private audioCtx: AudioContext | null = null;
  private notesQueue: { freq: number; duration: number }[] = [];
  private currentIndex: number = 0;
  private nextNoteTimeout: NodeJS.Timeout | null = null;
  private currentCode: string = "";

  private readonly notesMap: Record<string, number> = {
    c: 261.63,
    "c#": 277.18,
    d: 293.66,
    "d#": 311.13,
    e: 329.63,
    f: 349.23,
    "f#": 369.99,
    g: 391.0,
    "g#": 415.3,
    a: 440.0,
    "a#": 466.16,
    b: 493.88,
    p: 0,
  };

  public onEnd?: () => void;

  public getCurrentCode() {
    return this.currentCode;
  }

  public play(rtttl: string): void {
    if (typeof window === "undefined") return;

    if (this.currentCode !== rtttl) {
      this.stop();
      this.currentCode = rtttl;
      this.parseRTTTL(rtttl);
    }

    if (!this.audioCtx) {
      this.audioCtx = new window.AudioContext();
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    this.scheduler();
  }

  public pause() {
    if (this.nextNoteTimeout) {
      clearTimeout(this.nextNoteTimeout);
      this.nextNoteTimeout = null;
    }
  }

  public stop() {
    this.pause();
    this.currentIndex = 0;
    this.currentCode = "";
    this.notesQueue = [];
  }

  private parseRTTTL(rtttl: string) {
    const sections = rtttl.split(":");
    if (sections.length < 3) return;

    const settings = sections[1]
      .split(",")
      .reduce((acc: Record<string, number>, s) => {
        const [key, val] = s.split("=");
        acc[key.trim()] = parseInt(val);
        return acc;
      }, {});

    const dDuration = settings.d || 4;
    const dOctave = settings.o || 5;
    const bpm = settings.b || 125;
    const wholeNoteMs = (60 / bpm) * 4 * 1000;

    this.notesQueue = sections[2].split(",").map((noteStr) => {
      const match = noteStr.trim().match(/(\d+)?([a-p#]+)(\d+)?(\.)?/i);
      if (!match) return { freq: 0, duration: 0 };

      const [, duration, note, octave, dot] = match;
      const d = duration ? parseInt(duration) : dDuration;
      const o = octave ? parseInt(octave) : dOctave;

      let noteDuration = wholeNoteMs / d;
      if (dot) noteDuration *= 1.5;

      return {
        freq: this.calculateFrequency(note.toLowerCase(), o),
        duration: noteDuration,
      };
    });
  }

  private scheduler() {
    if (this.currentIndex >= this.notesQueue.length) {
      this.currentCode = "";
      this.currentIndex = 0;
      this.onEnd?.();
      return;
    }

    const note = this.notesQueue[this.currentIndex];

    if (note.freq > 0) {
      this.playTone(note.freq, note.duration / 1000);
    }

    this.nextNoteTimeout = setTimeout(() => {
      this.currentIndex++;
      this.scheduler();
    }, note.duration);
  }

  private calculateFrequency(note: string, octave: number): number {
    if (note === "p") return 0;
    return this.notesMap[note] * Math.pow(2, octave - 4);
  }

  private playTone(freq: number, duration: number): void {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      this.audioCtx.currentTime + duration,
    );

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }
}

export const playerInstance = new RTTTLPlayer();
