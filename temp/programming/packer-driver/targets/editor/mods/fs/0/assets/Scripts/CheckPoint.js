System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, BoxCollider, find, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, CheckPoint;

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
      BoxCollider = _cc.BoxCollider;
      find = _cc.find;
      director = _cc.director;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cfd0exdaEpIx48MgemC7SDf", "CheckPoint", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CheckPoint", CheckPoint = (_dec = ccclass('CheckPoint'), _dec(_class = (_temp = class CheckPoint extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_playerNode", null);

          _defineProperty(this, "_isInCheckPoint", false);

          _defineProperty(this, "_blocks", null);

          _defineProperty(this, "_timer", 0);
        }

        start() {
          let collider = this.getComponent(BoxCollider);
          collider.on('onCollisionEnter', this._onCollisionEnter, this);
          this._playerNode = find('Models/PlayerNode');
        }

        update(dt) {
          this._timer += dt;

          if (this._timer > 1 && this._isInCheckPoint && this._blocks.length != 0) {
            // 逐个对方块进行结算
            let block = this._blocks.pop();

            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).InGameState.LOAD_SCORE, 3000, block.getPosition());
            block.destroy();
            this._timer = 0;

            if (this._blocks.length == 0) {
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).GameState.CHECK_POINT, true);
            }
          }
        }

        _onCollisionEnter(event) {
          if (event.otherCollider.name === 'block<BoxCollider>' && !this._isInCheckPoint) {
            this._isInCheckPoint = true;
            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).InGameState.STOP_MOVING); // 子节点只要 block 节点，其他过滤掉

            this._blocks = this._playerNode.children.filter(node => {
              return node.name === "block";
            });
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=CheckPoint.js.map