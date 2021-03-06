System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, BoxCollider, director, find, SkeletalAnimation, GameManager, _dec, _class, _temp, _crd, ccclass, property, Player;

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
      director = _cc.director;
      find = _cc.find;
      SkeletalAnimation = _cc.SkeletalAnimation;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0a20c2PQ/xLzKvI+UKfVqav", "Player", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Player", Player = (_dec = ccclass('Player'), _dec(_class = (_temp = class Player extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_checkPointNode", null);

          _defineProperty(this, "_isGameOver", false);
        }

        start() {
          const playerAnim = this.node.getComponent(SkeletalAnimation);
          playerAnim.play('Root|Run');
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, () => {
            playerAnim.play('Root|Idle');
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.CHECK_POINT, () => {
            playerAnim.play('Root|Idle');
          }, this);
          let collider = this.node.getComponent(BoxCollider);
          collider.on('onCollisionEnter', this._onCollisionEnter, this); // ?????? 2 ??????????????????????????????

          this.scheduleOnce(() => {
            this._checkPointNode = find('Models/CheckPoint');
          }, 2);
        }

        update(dt) {
          // ??????????????????????????????
          if (this.node.getWorldPosition().y < 0 && !this._isGameOver) {
            this._gameOver();
          }
        }

        _onCollisionEnter(event) {
          // ????????????????????????????????????
          if (event.otherCollider.name === 'crate<BoxCollider>' && !this._isGameOver) {
            this._gameOver(); // ?????????????????????????????????

          } else if (event.otherCollider.name === 'bridge_1_row<BoxCollider>' && !this._isGameOver) {
            if (event.otherCollider.node.isChildOf(this._checkPointNode)) {
              return;
            }

            this._gameOver();
          }
        }

        _gameOver() {
          this._isGameOver = true;
          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.STOP_MOVING);
          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER);
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Player.js.map