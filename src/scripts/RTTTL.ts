import { notes } from "../configs/redactorConfig";

class RTTTL {
  private name: string = "";
  private octave: number = 5;
  private tempo: number = 120;
  private noteDuration: number = 8;
  private code: string = "";

  public setName(name: string) {
    this.name = name;
  }

  public setOctave(octave: number) {
    this.octave = octave;
  }

  public setDuration(tempo: number) {
    this.tempo = tempo;
  }

  public setNodeDuration(noteDuration: number) {
    this.noteDuration = noteDuration;
  }

  public getCode(body: boolean[][]) {
    let result = "";
    body.forEach((column) => {
      const noteIndex = column.findIndex((i) => i);
      if (noteIndex === -1) {
        result += "p,";
        return;
      }
      const currentOctave = 8 - Math.floor(noteIndex / 12);

      result += `${notes.toReversed()[noteIndex % 12].toLowerCase()}${currentOctave !== this.octave ? currentOctave : ""},`;
    });
    this.code = this.deletePauseLeft(result);

    return this.code;
  }

  private deletePauseLeft(str: string) {
    const array = str.split(",");
    return array
      .slice(0, array.findLastIndex((item) => item !== "" && item !== "p") + 1)
      .join(",");
  }

  public getRTTTL(code: string) {
    return `${this.name}:d=${this.noteDuration},o=${this.octave},b=${this.tempo}:${code}`;
  }
}

export default RTTTL;
