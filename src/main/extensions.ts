import { BrowserWindow } from 'electron';

import path from 'path';

export async function installDevExtensions(win: BrowserWindow) {
  const session = win.webContents.session;

  // react developer tools
  await session.loadExtension(
    path.join(__static, `extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0`)
  );
  // redux developer tools
  await session.loadExtension(
    path.join(__static, `extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0`)
  );
}
