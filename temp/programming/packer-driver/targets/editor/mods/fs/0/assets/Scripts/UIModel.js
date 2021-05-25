System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _temp, _crd, ccclass, property, UIModel;

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

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIModel", UIModel = (_dec = ccclass('UIModel'), _dec(_class = (_temp = class UIModel extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_isRotate", true);
        }

        start() {}

        update(dt) {
          if (this._isRotate) {
            let pos = this.node.eulerAngles;
            pos.y += 50 * dt;
            this.node.setRotationFromEuler(pos);
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=UIModel.js.map