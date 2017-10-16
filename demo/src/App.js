/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import ReactDynamicFont from '../../src';

import styles from './styles/app.css';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      content: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1 styleName="title">Fixed Width</h1>
        <div styleName="fixed-width">
          <p styleName="tag">text-align: left</p>
          <div styleName="text left">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p styleName="tag">text-align: center</p>
          <div styleName="text center">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p styleName="tag">text-align: right</p>
          <div styleName="text right">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p styleName="tag">with smooth animate</p>
          <div styleName="text left">
            <ReactDynamicFont smooth content={this.state.content} />
          </div>
        </div>
        <br />
        <div styleName="input">
          <textarea
            placeholder="input your text here"
            onChange={this.handleInput}
            value={this.state.content}
          />
        </div>
      </div>
    );
  }
}

export default CSSModules(App, styles, { allowMultiple: true });
