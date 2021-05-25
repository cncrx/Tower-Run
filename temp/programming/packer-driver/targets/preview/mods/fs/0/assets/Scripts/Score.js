System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, find, Label, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, Score;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Score", Score = (_dec = ccclass('Score'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Score, _Component);

        function Score() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_scoreLabel", null);

          _defineProperty(_assertThisInitialized(_this), "_scoreLabelPos", null);

          _defineProperty(_assertThisInitialized(_this), "_scorePos", null);

          _defineProperty(_assertThisInitialized(_this), "_distance", 100);

          return _this;
        }

        var _proto = Score.prototype;

        _proto.start = function start() {
          this._scoreLabel = find('Canvas/UI/ScoreUI/score_label');
        };

        _proto.update = function update(dt) {
          if (this._distance >= 30) {
            this._scoreLabelPos = this._scoreLabel.getWorldPosition();
            this._scorePos = this.node.getWorldPosition();

            var direction = this._scoreLabelPos.subtract(this._scorePos);

            this._distance = direction.length();
            direction.normalize();
            this.node.setPosition(this.node.getPosition().add(direction.multiplyScalar(650 * dt)));
          } else {
            var scoreNum = Number(this.node.getComponent(Label).string.slice(-4)); // 获取当前的分数

            director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).InGameState.SCORE_ADDED, scoreNum);
            this.node.destroy();
          }
        };

        return Score;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Score.js.map