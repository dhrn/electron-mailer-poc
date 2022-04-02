import { contextBridge, ipcRenderer } from 'electron';
import { mailTransporter } from './mailer';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  setupTransporter: (mailConfig) => mailTransporter.setup(mailConfig),
  sendMail: (mailConfig) => mailTransporter.send(mailConfig),
});
