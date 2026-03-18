import { RTTTLMelody } from "../configs/default_melodies";

class RTTTLFile {
  downloadFile(content: string, fileName: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  prepareRTTTLContent(melodies: RTTTLMelody[]): string {
    return JSON.stringify(melodies, null, 2);
  }

  getFile(melodies: RTTTLMelody[]) {
    const content = this.prepareRTTTLContent(melodies);
    this.downloadFile(content, "melodies.json", "application/json");
  }
}

export const rtttlFileInstance = new RTTTLFile();
