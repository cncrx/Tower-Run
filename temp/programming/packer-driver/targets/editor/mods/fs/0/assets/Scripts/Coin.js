System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./Block", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, BoxCollider, Block, GameManager, _dec, _class, _temp, _crd, ccclass, property, Coin;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfBlock(extras) {
    _reporterNs.report("Block", "./Block", _context.meta, extras);
  }

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
      BoxCollider = _cc.BoxCollider;
    }, function (_Block) {
      Block = _Block.Block;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "912e42B1fBAOZ8EOL9y7ML2", "Coin", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Coin", Coin = (_dec = ccclass('Coin'), _dec(_class = (_temp = class Coin extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_inProcess", false);

          _defineProperty(this, "_isAscend", false);
        }

        start() {
          let collider = this.node.getComponent(BoxCollider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }

        update(dt) {
          if (this._isAscend) {
            let curPos = this.node.getPosition();
            this.node.setPosition(curPos.x, curPos.y + 10 * dt, curPos.z);
          }
        }

        _onTriggerEnter(event) {
          if (event.otherCollider.name === 'block<BoxCollider>') {
            let blockComp = event.otherCollider.node.getComponent(_crd && Block === void 0 ? (_reportPossibleCrUseOfBlock({
              error: Error()
            }), Block) : Block);

            if (blockComp.isPlayerNodeChild && !this._inProcess) {
              this._inProcess = true;
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).InGameState.LOAD_SCORE, 5000, this.node.getPosition(), true);
              this._isAscend = true;
              this.scheduleOnce(() => {
                this.node.destroy();
              }, 0.8); // 给 0.8 秒灯动画播放完后销毁
            }
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Coin.js.map