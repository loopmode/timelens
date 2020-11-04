// import path from 'path';
import activeWin from 'active-win';
import { HistoryDB } from './HistoryDB';
import { HistoryUtils } from './HistoryUtils';
/**
 * Checks for the active window periodically and creates a DB entry
 * when either the title or the id of the active window has changed.
 */
export class HistoryLogger {
  intervalDuration: number;
  intervalId?: NodeJS.Timeout;

  lastWindowId?: number;
  lastWindowTitle?: string;
  lastTime?: number;

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
      this.lastWindowId === info.id && this.lastWindowTitle === info.title;

    if (isSameWindow) {
      return;
    }

    try {
      const now = Date.now();

      if (this.lastTime) {
        const duration = now - (this.lastTime || 0);
        const entry = HistoryUtils.createEntry(info, duration);
        await HistoryDB.insert(entry);
        console.log('[HistoryLogger]', entry);
      }

      this.lastTime = now;
      this.lastWindowId = info.id;
      this.lastWindowTitle = info.title;
    } catch (error) {
      console.error(error);
    }
  }
}