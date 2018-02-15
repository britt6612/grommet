'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _hocs = require('../hocs');

var _StyledTable = require('./StyledTable');

var _StyledTable2 = _interopRequireDefault(_StyledTable);

var _doc = require('./doc');

var _doc2 = _interopRequireDefault(_doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Table.prototype.render = function render() {
    var _props = this.props,
        caption = _props.caption,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['caption', 'children']);

    return _react2.default.createElement(
      _StyledTable2.default,
      rest,
      caption ? _react2.default.createElement(
        _StyledTable.StyledTableDataCaption,
        null,
        caption
      ) : null,
      children
    );
  };

  return Table;
}(_react.Component);

Table.defaultProps = { columns: [], data: [] };


if (process.env.NODE_ENV !== 'production') {
  (0, _doc2.default)(Table);
}

exports.default = (0, _recompose.compose)(_hocs.withTheme)(Table);