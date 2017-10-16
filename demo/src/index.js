/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import App from './App';

const rootEl = document.getElementById('root');
render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      rootEl,
    );
  });
}
