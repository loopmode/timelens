/** this is the format we save to the DB */
declare type HistoryEntry = {
  readonly id: string;
  platform: string;
  title: string;
  window_id: number;
  owner_name: string;
  owner_process_id: number;
  owner_bundle_id: number | null;
  owner_path: string;
  url: string | null;
  memory_usage: number;
  duration: number;
  time: number;
  readonly timestamp: string;
};

declare type Activity =
  | import('active-win').MacOSResult
  | import('active-win').LinuxResult
  | import('active-win').WindowsResult;
