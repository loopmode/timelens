import React from 'react';
import { hot } from 'react-hot-loader/root';
import electron from 'electron';

import { getStatic } from './utils/static';
import css from './App.scss';

function App() {
  return (
    <div className={css.App}>
      <div className="empty">
        <div className="empty-action">
          <img
            className="logo"
            src={getStatic('images/electron.png')}
            alt="electron"
          />
        </div>

        <h1 className="empty-title">Welcome to your app!</h1>

        <div className="empty-action">
          <button
            className="btn btn-primary"
            onClick={() =>
              electron.shell.openExternal('https://webpack.electron.build')
            }
          >
            Documentation
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              electron.shell.openExternal('https://electron.atom.io/docs/')
            }
          >
            Electron
          </button>
          <br />
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              electron v{require('electron/package.json').version}
            </li>
            <li className="breadcrumb-item">
              webpack v{require('webpack/package.json').version}
            </li>
            <li className="breadcrumb-item">
              electron-webpack v
              {require('electron-webpack/package.json').version}
            </li>
            <li className="breadcrumb-item">
              typescript v{require('typescript/package.json').version}
            </li>
            <li className="breadcrumb-item">
              react v{require('react/package.json').version}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default hot(App);
