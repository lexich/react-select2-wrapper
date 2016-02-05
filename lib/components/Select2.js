'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('select2');

var _shallowEqualFuzzy = require('shallow-equal-fuzzy');

var _shallowEqualFuzzy2 = _interopRequireDefault(_shallowEqualFuzzy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select2 = function (_Component) {
  _inherits(Select2, _Component);

  function Select2(props) {
    _classCallCheck(this, Select2);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select2).call(this, props));

    _this.el = null;
    return _this;
  }

  _createClass(Select2, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.initSelect2();
      this.props.events.forEach(function (event) {
        _this2.el.on(event[0], _this2.props[event[1]]);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.el && nextProps.value !== this.props.value) {
        this.setValue(nextProps.value);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!(0, _shallowEqualFuzzy2.default)(prevProps.data, this.props.data)) {
        this.destroySelect2();
        this.initSelect2();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.props.events.forEach(function (event) {
        _this3.el.off(event[0], _this3.props[event[1]]);
      });
      this.destroySelect2();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var elVal = this.el.val();
      if (!(0, _shallowEqualFuzzy2.default)(elVal, value)) {
        this.el.val(value).trigger('change');
      }
    }
  }, {
    key: 'initSelect2',
    value: function initSelect2() {
      if (this.el) {
        return;
      }
      this.el = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this));
      this.el.select2(this.props.options);
      var _props = this.props;
      var defaultValue = _props.defaultValue;
      var value = _props.value;

      if (defaultValue === void 0 && value !== void 0) {
        this.setValue(value);
      }
    }
  }, {
    key: 'destroySelect2',
    value: function destroySelect2() {
      if (!this.el) {
        return;
      }
      this.el.select2('destroy');
      this.el = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var data = _props2.data;
      var value = _props2.value;

      var params = _objectWithoutProperties(_props2, ['data', 'value']);

      return _react2.default.createElement(
        'select',
        params,
        data.map(function (item, k) {
          if (typeof item === 'string' || !!item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && Object.prototype.toString.call(item) === '[object String]') {
            return _react2.default.createElement(
              'option',
              { key: 'option-' + k, value: item },
              item
            );
          }

          var id = item.id;
          var text = item.text;

          var itemParams = _objectWithoutProperties(item, ['id', 'text']);

          return _react2.default.createElement(
            'option',
            _extends({ key: 'option-' + k, value: id }, itemParams),
            text
          );
        })
      );
    }
  }]);

  return Select2;
}(_react.Component);

Select2.propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array, _react.PropTypes.string]),
  value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array, _react.PropTypes.string]),
  data: _react.PropTypes.array,
  events: _react.PropTypes.array,
  options: _react.PropTypes.object,
  multiple: _react.PropTypes.bool,
  onOpen: _react.PropTypes.func,
  onClose: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onUnselect: _react.PropTypes.func
};
Select2.defaultProps = {
  data: [],
  events: [['change', 'onChange'], ['select2:open', 'onOpen'], ['select2:close', 'onClose'], ['select2:select', 'onSelect'], ['select2:unselect', 'onUnselect']],
  options: {},
  multiple: false
};
exports.default = Select2;
module.exports = exports['default'];