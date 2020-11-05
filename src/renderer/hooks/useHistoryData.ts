import React from 'react';
import { ipcRenderer } from 'electron';

export function useHistoryData(autoload = true) {
  const [data, setData] = React.useState<HistoryEntry[]>([]);

  const load = React.useCallback(() => {
    ipcRenderer.send('history-data-request');
  }, []);

  React.useEffect(() => {
    const onInitialData = (e: any, data: any) => {
      setData(data.reverse());
    };
    const onUpdate = (e: any, entry: any) => {
      setData((current) => [entry, ...current]);
    };

    ipcRenderer.on('history-data', onInitialData);
    ipcRenderer.on('history-saved', onUpdate);

    if (autoload) {
      load();
    }

    return () => {
      ipcRenderer.removeListener('history-data', onInitialData);
      ipcRenderer.removeListener('history-saved', onUpdate);
    };
  }, [autoload, load]);

  return { load, data };
}
