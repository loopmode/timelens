import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { HistoryLogger } from './HistoryLogger';
import { HistoryDB } from './HistoryDB';
import bind from '@loopmode/bind';

export class HistoryLoggerIPC {
  private logger: HistoryLogger;
  private win: BrowserWindow;
  constructor(logger: HistoryLogger, win: BrowserWindow) {
    bind(this);
    this.logger = logger;
    this.win = win;
    this.logger.on('saved', this.handleSaved);

    ipcMain.on('history-data-request', this.handleDataRequest);
  }
  public destroy() {
    this.logger.off('saved', this.handleSaved);
  }
  private handleSaved(entry: HistoryEntry) {
    this.win.webContents?.send('history-saved', entry);
  }
  private async handleDataRequest(event: IpcMainEvent) {
    const data = await HistoryDB.find();
    event.sender.send('history-data', data);
  }
}
