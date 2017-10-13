'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

import PropTypes from 'prop-types'

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  main: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    msTransformOrigin: '0 50%',
    WebkitTransformOrigin: '0 50%',
    OTransformOrigin: '0 50%',
    MozTransformOrigin: '0 50%',
    transformOrigin: '0 50%'
  },
  animate: {
    msTransition: '-ms-transform 400ms',
    WebkitTransition: '-webkit-transform 400ms',
    OTransition: '-o-transform 400ms',
    MozTransition: '-moz-transform 400ms',
    transition: 'transform 400ms'
  }
};

var ReactDynamicFont = function (_Component) {
  _inherits(ReactDynamicFont, _Component);

  function ReactDynamicFont(props) {
    _classCallCheck(this, ReactDynamicFont);

    var _this = _possibleConstructorReturn(this, (ReactDynamicFont.__proto__ || Object.getPrototypeOf(ReactDynamicFont)).call(this, props));

    _this.getMaxWidth = function () {
      return _this.getNodeWidth(_this.node.parentNode);
    };

    _this.getCurrentWidth = function () {
      return _this.getNodeWidth(_this.node);
    };

    _this.fixWidth = function () {
      var maxWidth = _this.getMaxWidth();
      var currentWidth = _this.getCurrentWidth();
      if (currentWidth > maxWidth) {
        _this.setState({ scale: maxWidth / currentWidth });
      } else {
        _this.setState({ scale: 1 });
      }
    };

    _this.state = {
      scale: 1
    };
    return _this;
  }

  _createClass(ReactDynamicFont, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.content && this.props.content.length) {
        this.fixWidth();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.content !== this.props.content && this.props.content.length) {
        this.fixWidth();
      }
    }
  }, {
    key: 'getNodeWidth',
    value: function getNodeWidth(node) {
      var nodeStyles = window.getComputedStyle(node);
      var width = node.offsetWidth;
      var borderLeftWidth = parseFloat(nodeStyles.borderLeftWidth);
      var borderRightWidth = parseFloat(nodeStyles.borderRightWidth);
      var paddingLeft = parseFloat(nodeStyles.paddingLeft);
      var paddingRight = parseFloat(nodeStyles.paddingRight);
      return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var scaleStyle = void 0;
      if (this.state.scale === 1) {
        scaleStyle = undefined;
      } else {
        var transformValue = 'scale(' + this.state.scale + ', ' + this.state.scale + ')';
        scaleStyle = {
          msTransform: transformValue,
          WebkitTransform: transformValue,
          OTransform: transformValue,
          MozTransform: transformValue,
          transform: transformValue
        };
      }
      var finalStyle = Object.assign({}, styles.main, this.props.smooth ? styles.animate : undefined, scaleStyle);
      return _react2.default.createElement(
        'span',
        {
          style: finalStyle,
          ref: function ref(span) {
            return _this2.node = span;
          }
        },
        this.props.content
      );
    }
  }]);

  return ReactDynamicFont;
}(_react.Component);

ReactDynamicFont.propTypes = {
  content: PropTypes.string.isRequired,
  smooth: PropTypes.bool.isRequired
};
ReactDynamicFont.defaultProps = {
  content: '',
  smooth: false
};
export default ReactDynamicFont;