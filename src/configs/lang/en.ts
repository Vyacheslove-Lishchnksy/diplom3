import { ILangSet } from ".";

export const EnglishSet: Required<ILangSet> = {
  HomeHeaderTitle: "All melodies",
  Search: "search...",
  RedactorHeaderTitle: "Redactor",
  ExportButtonText: "Export",
  ImportButtonText: "Import",
  UploadButtonTitle: "Upload",
  ChangeButtonTitle: "Change",
  ConnectButtonTitle: "Connect",
  ChangeDeviceMenuTitle: "Connected to device ID:",
  ChangeDeviceMenuTitleNo: "No connected to device",
  TheSameNameError: "Melodies can`t have the same name",
  CanNotBeEmptyError: "Notes section cannot be empty",
  InvalidNoteError: (value: string) => `Invalid note found: ${value}`,
  InvalidFormatError: "Invalid format. Expected 'Title:Settings:Notes'",
  InvalidSettingsError: "Invalid settings. Use format 'd=4,o=5,b=160'",
};
