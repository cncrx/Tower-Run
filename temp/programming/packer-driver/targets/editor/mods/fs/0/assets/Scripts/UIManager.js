System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, director, resources, Prefab, log, instantiate, find, Label, Animation, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _crd, ccclass, property, UIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
      Node = _cc.Node;
      director = _cc.director;
      resources = _cc.resources;
      Prefab = _cc.Prefab;
      log = _cc.log;
      instantiate = _cc.instantiate;
      find = _cc.find;
      Label = _cc.Label;
      Animation = _cc.Animation;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9ec650Zg2tDwYlkxT1gmvce", "UIManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = (_temp = class UIManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scoreLabel", _descriptor, this);

          _initializerDefineProperty(this, "gameOverNode", _descriptor2, this);

          _initializerDefineProperty(this, "gameOverTitle", _descriptor3, this);

          _initializerDefineProperty(this, "totalScoreLabel", _descriptor4, this);

          _defineProperty(this, "_curScore", 0);
        }

        start() {
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.LOAD_SCORE, this._loadScore, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).InGameState.SCORE_ADDED, this._scoreAdded, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.GAME_OVER, this._showGameOverUI, this);
          director.on((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.CHECK_POINT, this._showGameOverUI, this);
        }

        _loadScore(scoreNum, pos, isCoin = false) {
          resources.load("score", Prefab, (err, prefab) => {
            if (err) {
              log("prefab err:", err);
              return;
            }

            let score = instantiate(prefab);
            score.getComponent(Label).string = isCoin ? `额外分数！+ ${scoreNum}` : `+ ${scoreNum}`;
            score.setParent(find("Canvas/UI"));
            score.setPosition(pos);
          });
        }

        _scoreAdded(scoreNum) {
          let label = this.scoreLabel.getComponent(Label);
          this._curScore = Number(label.string) + scoreNum;
          label.string = String(this._curScore);
          let anim = this.scoreLabel.getComponent(Animation);
          anim.play("score_added");
        }

        _showGameOverUI(win = false) {
          this.scheduleOnce(() => {
            this.gameOverTitle.string = win ? "游戏胜利" : "游戏失败";
            this.totalScoreLabel.string = `本局得分：${this._curScore} 分`;
            this.gameOverNode.active = true;
          }, 1.5);
        }

        playAgain() {
          let label = this.scoreLabel.getComponent(Label);
          label.string = "0000";
          this.gameOverNode.active = false;
          director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).GameState.INIT);
        }

        gotoMenu() {
          director.loadScene("menu", () => {
            log('menu scene loaded');
          });
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameOverNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameOverTitle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalScoreLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=UIManager.js.map