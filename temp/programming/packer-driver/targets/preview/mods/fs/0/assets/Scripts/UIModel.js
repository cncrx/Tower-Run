System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _temp, _crd, ccclass, property, UIModel;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5c5fcWBX11CRbtonQnohYq1", "UIModel", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("UIModel", UIModel = (_dec = ccclass('UIModel'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIModel, _Component);

        function UIModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_isRotate", true);

          return _this;
        }

        var _proto = UIModel.prototype;

        _proto.start = function start() {};

        _proto.update = function update(dt) {
          if (this._isRotate) {
            var pos = this.node.eulerAngles;
            pos.y += 50 * dt;
            this.node.setRotationFromEuler(pos);
          }
        };

        return UIModel;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=UIModel.js.map