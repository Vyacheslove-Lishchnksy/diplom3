import { IErrorFormat } from "../components/UI/ErrorTextUI";

export const validateRTTTL = (code: string): IErrorFormat => {
  const parts = code.split(":");

  if (parts.length !== 3) {
    return {
      isError: false,
      title: "Invalid format. Expected 'Title:Settings:Notes'",
    };
  }

  const [title, settings, notes] = parts;

  if (!title.trim()) {
    return { isError: true, title: "Title is required" };
  }

  const settingsRegex = /^d=(1|2|4|8|16|32),o=[4-7],b=[0-9]+$/;
  if (!settingsRegex.test(settings.toLowerCase().trim())) {
    return {
      isError: true,
      title: "Invalid settings. Use format 'd=4,o=5,b=160'",
    };
  }

  const individualNotes = notes.split(",");
  const noteRegex = /^(1|2|4|8|16|32)?([a-g]|p)#?[4-7]?\.?$/i;

  if (individualNotes.length === 0 || notes.trim() === "") {
    return { isError: true, title: "Notes section cannot be empty" };
  }

  for (const note of individualNotes) {
    const trimmedNote = note.trim();
    if (!noteRegex.test(trimmedNote)) {
      return {
        isError: true,
        title: `Invalid note found: "${trimmedNote}"`,
      };
    }
  }

  return { isError: false, title: "" };
};
