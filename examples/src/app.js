import React, { PureComponent, Fragment } from 'react';
import './app.css';

// eslint-disable-next-line import/no-unresolved
import ReactDynamicFont from './lib';

export default class App extends PureComponent {
  state = {
    content: '',
  };

  handleInput = event => {
    this.setState({
      content: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <h1 className="title">Fixed Width</h1>
        <div className="fixed-width">
          <p className="tag">text-align: left</p>
          <div className="text left">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p className="tag">text-align: center</p>
          <div className="text center">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p className="tag">text-align: right</p>
          <div className="text right">
            <ReactDynamicFont content={this.state.content} />
          </div>
          <p className="tag">with smooth animate</p>
          <div className="text left">
            <ReactDynamicFont smooth content={this.state.content} />
          </div>
        </div>
        <br />
        <div className="input">
          <textarea
            placeholder="input your text here"
            onChange={this.handleInput}
            value={this.state.content}
          />
        </div>
      </Fragment>
    );
  }
}
