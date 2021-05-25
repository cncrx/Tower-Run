System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, view, GameManager, _dec, _class, _temp, _crd, ccclass, property, PlayerCtrl;

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
      director = _cc.director;
      view = _cc.view;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3bbafA048ZJsqqg/Vu8OJKQ", "PlayerCtrl", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("PlayerCtrl", PlayerCtrl = (_dec = ccclass('PlayerCtrl'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerCtrl, _Component);

        function PlayerCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_moving", true);

          _defineProperty(_assertThisInitialized(_this), "_visibleSize", view.getVisibleSize());

          _defineProperty(_assertThisInitialized(_this), "_avgNum", _this._visibleSize.width / 3);

          return _this;
        }

        var _proto = PlayerCtrl.prototype;

        _proto.start = function start() {
          var _this2 = this;

          this.node.on('touch-move', this._touchMove, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.STOP_MOVING, function () {
            _this2._moving = false;
          }, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.START_MOVING, function () {
            _this2._moving = true;
          }, this);
        };

        _proto.update = function update(dt) {
          if (this._moving) {
            var pos = this.node.getWorldPosition();
            pos.z += 2 * dt;
            this.node.setWorldPosition(pos);
          }
        };

        _proto._touchMove = function _touchMove(event) {
          var touchX = event.getUILocation().x;
          var pos = this.node.getPosition(); // _avgNum: 720

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
        };

        return PlayerCtrl;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=PlayerCtrl.js.map