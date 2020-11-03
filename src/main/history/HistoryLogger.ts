// import path from 'path';
import activeWin from 'active-win';
import { HistoryDB } from './HistoryDB';
import { HistoryUtils } from './HistoryUtils';

export class HistoryLogger {
  intervalDuration: number;
  intervalId?: NodeJS.Timeout;

  lastSavedWinmdowId?: number;
  lastSavedWindowTitle?: string;
  lastSavedTime?: number;

  constructor(intervalDuration = 1000) {
    this.intervalDuration = intervalDuration;
  }

  public startPolling() {
    this.intervalId = setInterval(
      this.handleTick.bind(this),
      this.intervalDuration
    );
  }

  public stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private async handleTick() {
    const info = await activeWin();
    if (!info) {
      return;
    }

    const isSameWindow =
      this.lastSavedWinmdowId === info.id &&
      this.lastSavedWindowTitle === info.title;

    if (isSameWindow) {
      return;
    }

    try {
      const now = Date.now();
      const duration = now - (this.lastSavedTime || 0);
      const entry = HistoryUtils.createEntry(info, duration);
      await HistoryDB.insert(entry);

      this.lastSavedTime = now;
      this.lastSavedWinmdowId = info.id;
      this.lastSavedWindowTitle = info.title;
    } catch (error) {
      console.error(error);
    }
  }
}
