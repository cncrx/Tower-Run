System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, find, Label, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, Score;

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
      find = _cc.find;
      Label = _cc.Label;
      director = _cc.director;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9bf8byamuRCcbbATKUJLV2j", "Score", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Score", Score = (_dec = ccclass('Score'), _dec(_class = (_temp = class Score extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_scoreLabel", null);

          _defineProperty(this, "_scoreLabelPos", null);

          _defineProperty(this, "_scorePos", null);

          _defineProperty(this, "_distance", 100);
        }

        start() {
          this._scoreLabel = find('Canvas/UI/ScoreUI/score_label');
        }

        update(dt) {
          if (this._distance >= 30) {
            this._scoreLabelPos = this._scoreLabel.getWorldPosition();
            this._scorePos = this.node.getWorldPosition();

            let direction = this._scoreLabelPos.subtract(this._scorePos);

            this._distance = direction.length();
            direction.normalize();
            this.node.setPosition(this.node.getPosition().add(direction.multiplyScalar(650 * dt)));
          } else {
            let scoreNum = Number(this.node.getComponent(Label).string.slice(-4)); // 获取当前的分数

            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).InGameState.SCORE_ADDED, scoreNum);
            this.node.destroy();
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Score.js.map