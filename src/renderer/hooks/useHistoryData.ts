import React from 'react';
import { ipcRenderer } from 'electron';

function scrollToBottom() {
  const y = document.body.scrollHeight || document.documentElement.scrollHeight;
  window.scrollTo(0, y);
}

export function useHistoryData(autoload = true) {
  const [data, setData] = React.useState<any[]>([]);

  const load = React.useCallback(() => {
    ipcRenderer.send('history-data-request');
  }, []);

  React.useEffect(() => {
    const onInitialData = (e: any, data: any) => {
      setData(data);
    };
    const onUpdate = (e: any, entry: any) => {
      setData((current) => [...current, entry]);
      scrollToBottom();
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
