import os from "os";
import path from "path";
import { remote } from 'electron';

const win = remote.getCurrentWindow();
const dialog = remote.dialog;
const home = os.homedir();

export function openSaveFileDialog(title: string, buttonLabel: string, defaulFileName: string, defaulFolder?: string) {
  const defaultPath = path.resolve(defaulFolder !== undefined ? defaulFolder : home, defaulFileName)

  const config = {
    title: title,
    defaultPath: defaultPath,
    buttonLabel: buttonLabel, filters: [{ name: 'Wszystkie pliki', extensions: ['*'] }]
  }

  return dialog.showSaveDialogSync(win, config);
}

export function openErrorDialog(title: string, message: string) {
  const config = {
    type: "error",
    buttons: ['Ok'],
    title: title,
    message: message,
  };

  dialog.showMessageBoxSync(win, config);
}

export function openWarringDialog(title: string, message: string) {
  const config = {
    type: "warning",
    buttons: ['Ok'],
    title: title,
    message: message,
  };

  dialog.showMessageBoxSync(win, config);
}
export function openOkMessageDialog(title: string, message: string) {
  const config = {
    type: "info",
    buttons: ['Ok'],
    title: title,
    message: message,
  };

  dialog.showMessageBoxSync(win, config);
}

export function openYesNoDialog(title: string, message: string) {
  const config = {
    type: "question",
    buttons: ['Tak', 'Nie'],
    title: title,
    message: message,
  };

  return dialog.showMessageBoxSync(win, config) === 0
}