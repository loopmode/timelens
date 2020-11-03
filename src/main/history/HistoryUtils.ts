import { LinuxResult, MacOSResult, WindowsResult } from 'active-win';
import { HistoryEntry } from './HistoryDB';

/**
 * Converts a result from the active-win library to the format we save to the db
 * @param activeWinResult
 * @param duration
 */
export function createEntry(
  activeWinResult: MacOSResult | LinuxResult | WindowsResult,
  duration: number
): HistoryEntry {
  return {
    platform: activeWinResult.platform,
    title: activeWinResult.title,
    window_id: activeWinResult.id,
    owner_name: activeWinResult.owner.name,
    owner_process_id: activeWinResult.owner.processId,
    owner_bundle_id: (activeWinResult as MacOSResult).owner.bundleId || null,
    owner_path: activeWinResult.owner.path,
    url: (activeWinResult as MacOSResult).url || null,
    memory_usage: activeWinResult.memoryUsage,
    duration: duration,
  };
}

export const HistoryUtils = {
  createEntry,
};
