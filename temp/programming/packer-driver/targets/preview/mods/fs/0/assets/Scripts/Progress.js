System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, ProgressBar, _dec, _class, _temp, _crd, ccclass, property, Progress;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      ProgressBar = _cc.ProgressBar;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3b4045h7ZZI6Kg1+CwU9cEl", "Progress", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Progress", Progress = (_dec = ccclass('Progress'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Progress, _Component);

        function Progress() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_progress", 0);

          return _this;
        }

        var _proto = Progress.prototype;

        _proto.update = function update(dt) {
          this._progress += 0.5 * dt;

          if (this._progress > 1) {
            this._progress = 1;
          }

          this.node.getComponent(ProgressBar).progress = this._progress;
        };

        return Progress;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Progress.js.map