"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "p",
        null,
        "Header Coming Soon"
      );
    }
  }]);

  return Header;
}(React.Component);

var UploadFile = function (_React$Component2) {
  _inherits(UploadFile, _React$Component2);

  function UploadFile() {
    _classCallCheck(this, UploadFile);

    return _possibleConstructorReturn(this, (UploadFile.__proto__ || Object.getPrototypeOf(UploadFile)).apply(this, arguments));
  }

  _createClass(UploadFile, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Drag Drop File Input"
        )
      );
    }
  }]);

  return UploadFile;
}(React.Component);

var HistoryList = function (_React$Component3) {
  _inherits(HistoryList, _React$Component3);

  function HistoryList() {
    _classCallCheck(this, HistoryList);

    return _possibleConstructorReturn(this, (HistoryList.__proto__ || Object.getPrototypeOf(HistoryList)).apply(this, arguments));
  }

  _createClass(HistoryList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "History"
        ),
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            "last report rendered"
          )
        )
      );
    }
  }]);

  return HistoryList;
}(React.Component);

var Transcript = function (_React$Component4) {
  _inherits(Transcript, _React$Component4);

  function Transcript() {
    _classCallCheck(this, Transcript);

    return _possibleConstructorReturn(this, (Transcript.__proto__ || Object.getPrototypeOf(Transcript)).apply(this, arguments));
  }

  _createClass(Transcript, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Transcript Coming Soon"
        )
      );
    }
  }]);

  return Transcript;
}(React.Component);

var Analytics = function (_React$Component5) {
  _inherits(Analytics, _React$Component5);

  function Analytics() {
    _classCallCheck(this, Analytics);

    return _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).apply(this, arguments));
  }

  _createClass(Analytics, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Analytics"
        )
      );
    }
  }]);

  return Analytics;
}(React.Component);

var jsx = React.createElement(
  "div",
  null,
  React.createElement(Header, null),
  React.createElement(UploadFile, null),
  React.createElement(HistoryList, null),
  React.createElement(Transcript, null),
  React.createElement(Analytics, null)
);

ReactDOM.render(jsx, document.getElementById("app"));
