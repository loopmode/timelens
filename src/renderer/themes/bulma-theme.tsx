import React from 'react';

import { Helmet } from 'react-helmet';

import get from 'lodash/get';

import { themes } from './themes';
import { useGlobalClass } from '../hooks/useGlobalClass';
import { getStatic } from '../utils/static';

export const BulmaTheme: React.FC<{ themeName: string }> = React.memo(
  ({ themeName }) => {
    useGlobalClass(
      themeName === 'none' ? '' : `theme-${themeName}`,
      document.documentElement
    );

    const theme = themes[themeName];
    const cssFiles: string[] = get(theme, 'files.css') || [];
    const jsFiles: string[] = get(theme, 'files.js') || [];

    return (
      <>
        <Helmet>
          <script src={getStatic('scripts/fontawesome.v5.3.1.all.js')} />
        </Helmet>
        <Helmet>
          {cssFiles.map((file) => (
            <link key={file} type="text/css" rel="stylesheet" href={file} />
          ))}
          {jsFiles.map((file) => (
            <script key={file} type="text/javascript" src={file} />
          ))}
        </Helmet>
      </>
    );
  }
);
