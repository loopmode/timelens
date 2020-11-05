import React from 'react';
import { hot } from 'react-hot-loader/root';

import css from './App.scss';
import { useHistoryData } from './hooks/useHistoryData';
import { BulmaTheme } from './themes/bulma-theme';

function App() {
  const { data } = useHistoryData();

  return (
    <div className={css.App}>
      <BulmaTheme themeName="darkly" />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>program</th>
            <th>path</th>
            <th>duration</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            return (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td className="short">{entry.title}</td>
                <td>{entry.owner_name}</td>
                <td className="short">{entry.owner_path}</td>
                <td>{entry.duration / 1000}s</td>
                <td>{entry.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default hot(App);
