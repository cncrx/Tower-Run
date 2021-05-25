System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, BoxCollider, director, find, SkeletalAnimation, GameManager, _dec, _class, _temp, _crd, ccclass, property, Player;

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Player", Player = (_dec = ccclass('Player'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);

        function Player() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_checkPointNode", null);

          _defineProperty(_assertThisInitialized(_this), "_isGameOver", false);

          return _this;
        }

        var _proto = Player.prototype;

        _proto.start = function start() {
          var _this2 = this;

          var playerAnim = this.node.getComponent(SkeletalAnimation);
          playerAnim.play('Root|Run');
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, function () {
            playerAnim.play('Root|Idle');
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.CHECK_POINT, function () {
            playerAnim.play('Root|Idle');
          }, this);
          var collider = this.node.getComponent(BoxCollider);
          collider.on('onCollisionEnter', this._onCollisionEnter, this); // 延迟 2 秒等检查点预制加载完

          this.scheduleOnce(function () {
            _this2._checkPointNode = find('Models/CheckPoint');
          }, 2);
        };

        _proto.update = function update(dt) {
          // 小人掉下桥，游戏结束
          if (this.node.getWorldPosition().y < 0 && !this._isGameOver) {
            this._gameOver();
          }
        };

        _proto._onCollisionEnter = function _onCollisionEnter(event) {
          // 小人碰撞到木箱，游戏结束
          if (event.otherCollider.name === 'crate<BoxCollider>' && !this._isGameOver) {
            this._gameOver(); // 小人碰撞到桥，游戏结束

          } else if (event.otherCollider.name === 'bridge_1_row<BoxCollider>' && !this._isGameOver) {
            if (event.otherCollider.node.isChildOf(this._checkPointNode)) {
              return;
            }

            this._gameOver();
          }
        };

        _proto._gameOver = function _gameOver() {
          this._isGameOver = true;
          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.STOP_MOVING);
          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER);
        };

        return Player;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Player.js.map