import { TLangCode } from "../defaultOptions";
import { EnglishSet } from "./en";
import { UkraineSet } from "./uk";

type TErrorWithDynamicValue = (value: string) => string;

export interface ILangSet {
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
  InvalidNoteError?: TErrorWithDynamicValue;
  InvalidFormatError?: string;
  InvalidSettingsError?: string;
}

export const locales: Record<TLangCode, ILangSet> = {
  en: EnglishSet,
  uk: UkraineSet,
};
