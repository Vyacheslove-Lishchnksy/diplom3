export const noteDurationList = ["1", "2", "4", "8", "16", "32"];
export const notes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
export const octaves = [5, 6, 7, 8];
const totalNotes = 48;
export const initValue: boolean[][] = Array.from({ length: 32 }, () =>
  Array<boolean>(totalNotes).fill(false),
);
