// eslint-disable-next-line import/no-unresolved, import/extensions
import React, { Component, PropTypes } from 'react';

import getNodeWidth from './utils';

const styles = {
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
    msTransition: '-ms-transform 400ms',
    WebkitTransition: '-webkit-transform 400ms',
    OTransition: '-o-transform 400ms',
    MozTransition: '-moz-transform 400ms',
    transition: 'transform 400ms',
  },
};

export default class ReactDynamicFont extends Component {
  static propTypes = {
    content: PropTypes.string,
    smooth: PropTypes.bool,
  }

  static defaultProps = {
    content: '',
    smooth: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
    };
  }

  componentDidMount() {
    if (this.props.content && this.props.content.length) {
      this.fixWidth();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content && this.props.content.length) {
      this.fixWidth();
    }
  }

  getMaxWidth = () => getNodeWidth(this.node.parentNode)

  getCurrentWidth = () => getNodeWidth(this.node)

  fixWidth = () => {
    const maxWidth = this.getMaxWidth();
    const currentWidth = this.getCurrentWidth();
    if (currentWidth > maxWidth) {
      this.setState({ scale: maxWidth / currentWidth });
    } else {
      this.setState({ scale: 1 });
    }
  }

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
    const finalStyle = Object.assign(
      {},
      styles.main,
      this.props.smooth ? styles.animate : undefined,
      scaleStyle,
    );
    return (
      <span
        style={finalStyle}
        ref={(span) => { this.node = span; }}
      >
        { this.props.content }
      </span>
    );
  }
}
