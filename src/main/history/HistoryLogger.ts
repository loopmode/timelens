// import path from 'path';
import { EventEmitter } from 'events';
import activeWin from 'active-win';
import { HistoryDB } from './HistoryDB';
import { HistoryUtils } from './HistoryUtils';

/**
 * Checks for the active window periodically and creates a DB entry
 * when either the title or the id of the active window has changed.
 */
export class HistoryLogger extends EventEmitter {
  intervalDuration: number;
  intervalId?: NodeJS.Timeout;

  startedActivity?: Activity;
  /** time in ms when the current activity was started */
  startedTime?: number;

  constructor(intervalDuration = 1000) {
    super();
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
    const newActivity: Activity | undefined = await activeWin();
    if (!newActivity) {
      return;
    }

    const isSameActivity =
      (this.startedActivity &&
        this.startedActivity.id === newActivity.id &&
        this.startedActivity.title === newActivity.title) ||
      false;

    if (isSameActivity) {
      return;
    }

    const now = Date.now();

    try {
      if (this.startedActivity && this.startedTime) {
        const duration = now - (this.startedTime || 0);
        const entry = HistoryUtils.createEntry(
          this.startedActivity,
          this.startedTime,
          duration
        );
        const result = await HistoryDB.insert(entry);
        this.emit('saved', result);
      }
    } catch (error) {
      console.error(error);
    }

    this.startedTime = now;
    this.startedActivity = newActivity;
  }
}
