import * as React from 'react';

import { getNodeWidth } from './utils';

const styles: {
  main: React.CSSProperties;
  animate: React.CSSProperties;
} = {
  main: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    msTransformOrigin: '0 50%',
    WebkitTransformOrigin: '0 50%',
    OTransformOrigin: '0 50%',
    MozTransformOrigin: '0 50%',
    transformOrigin: '0 50%',
  },
  animate: {
    // msTransition: '-ms-transform 400ms',
    WebkitTransition: '-webkit-transform 400ms',
    OTransition: '-o-transform 400ms',
    MozTransition: '-moz-transform 400ms',
    transition: 'transform 400ms',
  },
};

export interface ReactDynamicFontProps {
  content?: string;
  smooth?: boolean;
}

interface ReactDynamicFontState {
  scale: number;
}

export class ReactDynamicFont extends React.Component<
  ReactDynamicFontProps,
  ReactDynamicFontState
> {
  static retryDelayMillisecond = 300;

  static maxRetryTimes = 5;

  state: ReactDynamicFontState = {
    scale: 1,
  };

  spanRef = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    if (this.props.content && this.props.content.length) {
      this.fixWidth();
    }
  }

  componentDidUpdate(prevProps: ReactDynamicFontProps) {
    if (prevProps.content !== this.props.content && (this.props.content || '').length) {
      this.fixWidth();
    }
  }

  getMaxWidth = () => getNodeWidth(this.spanRef.current!.parentElement!);

  getCurrentWidth = () => getNodeWidth(this.spanRef.current!);

  setRetryTimmer() {
    if (this.retryTimmer != null) {
      clearTimeout(this.retryTimmer);
      this.retryTimmer = null;
    }
    if (this.timesOfRetryGetWidth <= ReactDynamicFont.maxRetryTimes) {
      this.retryTimmer = window.setTimeout(this.fixWidth, ReactDynamicFont.retryDelayMillisecond);
    }
  }

  retryTimmer: number | null = null;

  timesOfRetryGetWidth = 0;

  fixWidth = () => {
    const maxWidth = this.getMaxWidth();
    const currentWidth = this.getCurrentWidth();

    if (currentWidth <= 0) {
      this.setRetryTimmer();
    } else {
      this.timesOfRetryGetWidth = 0;
      if (currentWidth > maxWidth) {
        this.setState({ scale: maxWidth / currentWidth });
      } else {
        this.setState({ scale: 1 });
      }
    }
  };

  render() {
    let scaleStyle;
    if (this.state.scale === 1) {
      scaleStyle = undefined;
    } else {
      const transformValue = `scale(${this.state.scale}, ${this.state.scale})`;
      scaleStyle = {
        msTransform: transformValue,
        WebkitTransform: transformValue,
        OTransform: transformValue,
        MozTransform: transformValue,
        transform: transformValue,
      };
    }
    const finalStyle = {
      ...styles.main,
      ...((this.props.smooth != null ? this.props.smooth : false) ? styles.animate : undefined),
      ...scaleStyle,
    };
    return (
      <span style={finalStyle} ref={this.spanRef}>
        {this.props.content}
      </span>
    );
  }
}
