'use strict';

import { app, BrowserWindow, Tray, Menu } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

import { HistoryLogger } from './history/HistoryLogger';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;
let tray: Tray | null = null;

const logger = new HistoryLogger();

logger.startPolling();

app.on('before-quit', function () {
  tray?.destroy();
  logger.stopPolling();
});

function quitApplication() {
  (app as any).isQuiting = true;
  app.quit();
}

async function createMainWindow() {
  const win = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    icon: path.join(__static, 'app.ico'),
  });

  win.on('close', function (event) {
    if (!(app as any).isQuiting) {
      event.preventDefault();
      mainWindow?.hide();
    }

    return false;
  });

  win.webContents.on('devtools-opened', () => {
    win.focus();
    setImmediate(() => {
      win.focus();
    });
  });

  if (isDevelopment) {
    const { installDevExtensions } = require('./extensions');
    await installDevExtensions(win);
    win.webContents.openDevTools();
    await win.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    );
  } else {
    await win.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  return win;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    quitApplication();
  }
});

app.on('activate', async () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = await createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
  mainWindow = await createMainWindow();
  tray = createTray();
});

function createTray() {
  const appIcon = new Tray(path.join(__static, 'app.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: function () {
        mainWindow?.show();
      },
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: function () {
        quitApplication();
      },
    },
  ]);

  appIcon.on('click', function () {
    contextMenu.popup();
  });
  appIcon.on('double-click', function () {
    mainWindow?.show();
  });
  // appIcon.setToolTip('Tray Tutorial');
  appIcon.setContextMenu(contextMenu);

  return appIcon;
}
