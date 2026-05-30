import { IErrorFormat } from "../components/UI/ErrorTextUI";
import { EnglishSet } from "../configs/lang/en";
import { useLocalization } from "./useLocalization";

export const useValidateRTTTL = () => {
  const lang = useLocalization();
  return (code: string): IErrorFormat => {
    const parts = code.split(":");

    if (parts.length !== 3) {
      return {
        isError: false,
        title: lang.InvalidFormatError ?? EnglishSet.InvalidFormatError,
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
        title: lang.InvalidSettingsError ?? EnglishSet.InvalidSettingsError,
      };
    }

    const individualNotes = notes.split(",");
    const noteRegex = /^(1|2|4|8|16|32)?([a-g]|p)#?[4-7]?\.?$/i;

    if (individualNotes.length === 0 || notes.trim() === "") {
      return {
        isError: true,
        title: lang.CanNotBeEmptyError ?? EnglishSet.CanNotBeEmptyError,
      };
    }

    for (const note of individualNotes) {
      const trimmedNote = note.trim();
      if (!noteRegex.test(trimmedNote)) {
        return {
          isError: true,
          title: lang.InvalidNoteError
            ? lang.InvalidNoteError(trimmedNote)
            : EnglishSet.InvalidNoteError(trimmedNote),
        };
      }
    }

    return { isError: false, title: "" };
  };
};
