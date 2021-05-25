System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, ProgressBar, _dec, _class, _temp, _crd, ccclass, property, Progress;

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

      ({
        ccclass,
        property
      } = _decorator);

      _export("Progress", Progress = (_dec = ccclass('Progress'), _dec(_class = (_temp = class Progress extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_progress", 0);
        }

        update(dt) {
          this._progress += 0.5 * dt;

          if (this._progress > 1) {
            this._progress = 1;
          }

          this.node.getComponent(ProgressBar).progress = this._progress;
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Progress.js.map