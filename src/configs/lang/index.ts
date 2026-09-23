import { TLangCode } from "../defaultOptions";
import { EnglishSet } from "./en";
import { UkraineSet } from "./uk";

type TMessageWithDynamicValue = (value: string) => string;

export interface ILangSet extends Record<string, string | TMessageWithDynamicValue | undefined> {
  HomeHeaderTitle?: string;
  Search?: string;
  RedactorHeaderTitle?: string;
  ExportButtonText?: string;
  ImportButtonText?: string;
  UploadButtonTitle?: string;
  ChangeButtonTitle?: string;
  ChangeDeviceMenuTitle?: string;
  ChangeDeviceMenuTitleNo?: string;
  ConnectButtonTitle?: string;
  TheSameNameError?: string;
  CanNotBeEmptyError?: string;
  InvalidNoteError?: TMessageWithDynamicValue;
  InvalidFormatError?: string;
  InvalidSettingsError?: string;
  MelodyIsEnded?: TMessageWithDynamicValue;
}

export const locales: Record<TLangCode, ILangSet> = {
  en: EnglishSet,
  uk: UkraineSet,
};
