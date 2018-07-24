import * as React from 'react';
import { render } from 'react-dom';

import ReactDynamicFont from 'index';

test('render ReactDynamicFont without crash', () => {
  const node = document.createElement('div');

  render(<ReactDynamicFont />, node);
});
