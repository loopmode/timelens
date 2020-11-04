import React from 'react';
import { hot } from 'react-hot-loader/root';

import css from './App.scss';

function App() {
  return (
    <div className={css.App}>
      <p>Hello!</p>
    </div>
  );
}

export default hot(App);
