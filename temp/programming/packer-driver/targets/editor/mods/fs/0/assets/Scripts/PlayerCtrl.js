System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, view, GameManager, _dec, _class, _temp, _crd, ccclass, property, PlayerCtrl;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      view = _cc.view;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3bbafA048ZJsqqg/Vu8OJKQ", "PlayerCtrl", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerCtrl", PlayerCtrl = (_dec = ccclass('PlayerCtrl'), _dec(_class = (_temp = class PlayerCtrl extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_moving", true);

          _defineProperty(this, "_visibleSize", view.getVisibleSize());

          _defineProperty(this, "_avgNum", this._visibleSize.width / 3);
        }

        start() {
          this.node.on('touch-move', this._touchMove, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.STOP_MOVING, () => {
            this._moving = false;
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.START_MOVING, () => {
            this._moving = true;
          }, this);
        }

        update(dt) {
          if (this._moving) {
            let pos = this.node.getWorldPosition();
            pos.z += 2 * dt;
            this.node.setWorldPosition(pos);
          }
        }

        _touchMove(event) {
          let touchX = event.getUILocation().x;
          let pos = this.node.getPosition(); // _avgNum: 720

          if (touchX <= this._avgNum) {
            // [0, 240]
            this.node.setPosition(1, pos.y, pos.z);
          } else if (touchX >= this._avgNum * 2) {
            // [480, 720]
            this.node.setPosition(-1, pos.y, pos.z);
          } else if (touchX >= this._avgNum && touchX <= this._avgNum * 2) {
            // [240, 480]
            this.node.setPosition(0, pos.y, pos.z);
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=PlayerCtrl.js.map