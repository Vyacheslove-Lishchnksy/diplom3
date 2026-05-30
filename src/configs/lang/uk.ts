import { ILangSet } from ".";

export const UkraineSet: ILangSet = {
  HomeHeaderTitle: "Всі мелодії",
  Search: "пошук...",
  RedactorHeaderTitle: "Редактор",
  ExportButtonText: "Експорт",
  ImportButtonText: "Імпорт",
  UploadButtonTitle: "Завантажити",
  ChangeButtonTitle: "Змінити",
  ChangeDeviceMenuTitle: "Пієднано до пристрою:",
  ChangeDeviceMenuTitleNo: "Задати індифікатор присрою",
  ConnectButtonTitle: "Приєднати",
  TheSameNameError: "Мелодії не можуть мати однакові імена",
  CanNotBeEmptyError: "Секція з нотами неможе бути прожньою",
  InvalidNoteError: (value) => `Невірне заповнення: ${value}`,
  InvalidFormatError:
    "Неправильний формат запису. Приклад: 'Назва:Налаштування:Ноти'",
  InvalidSettingsError: "Неправльні налаштування. Приклад: 'd=4,o=5,b=160'",
};
