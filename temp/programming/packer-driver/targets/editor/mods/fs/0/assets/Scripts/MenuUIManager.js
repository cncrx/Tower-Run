System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, director, log, MeshRenderer, sys, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, _crd, ccclass, property, MenuUIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      director = _cc.director;
      log = _cc.log;
      MeshRenderer = _cc.MeshRenderer;
      sys = _cc.sys;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2d1a617RLtI8rrpLLT2h5sg", "MenuUIManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MenuUIManager", MenuUIManager = (_dec = ccclass('MenuUIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = class MenuUIManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mainNode", _descriptor, this);

          _initializerDefineProperty(this, "guideNode", _descriptor2, this);

          _initializerDefineProperty(this, "loadingNode", _descriptor3, this);

          _initializerDefineProperty(this, "player", _descriptor4, this);

          _initializerDefineProperty(this, "block", _descriptor5, this);

          _defineProperty(this, "_playerSkinCurID", 1);

          _defineProperty(this, "_playerSkinMaxID", 4);

          _defineProperty(this, "_blockSkinCurID", 1);

          _defineProperty(this, "_blockSkinMaxID", 5);

          _defineProperty(this, "_playerMesh", null);

          _defineProperty(this, "_blockMesh", null);
        }

        start() {
          this._playerMesh = this.player.getComponent(MeshRenderer);
          this._blockMesh = this.block.getComponent(MeshRenderer);

          this._getSkinID();
        }

        startGame() {
          this.mainNode.active = false;
          this.guideNode.active = false;
          this.loadingNode.active = true;
          director.preloadScene("game", () => {
            log('game scene pre loaded');
          });
          this.scheduleOnce(() => {
            director.loadScene("game", () => {
              log('game scene loaded');
            });
          }, 2); // 给 2 秒等加载条走完
        }

        changeSkin(e, params) {
          const model = params.split(';')[0];
          const action = params.split(';')[1];

          if (model === 'player') {
            if (action === 'perv') this._playerSkinCurID === 2 ? this._playerSkinCurID = this._playerSkinMaxID : this._playerSkinCurID--;else if (action === 'next') this._playerSkinCurID === this._playerSkinMaxID ? this._playerSkinCurID = 2 : this._playerSkinCurID++;

            this._setSkin('player', this._playerSkinCurID);

            this._storageData('player', this._playerSkinCurID);
          } else if (model === 'block') {
            if (action === 'perv') this._blockSkinCurID === 2 ? this._blockSkinCurID = this._blockSkinMaxID : this._blockSkinCurID--;else if (action === 'next') this._blockSkinCurID === this._blockSkinMaxID ? this._blockSkinCurID = 2 : this._blockSkinCurID++;

            this._setSkin('block', this._blockSkinCurID);

            this._storageData('block', this._blockSkinCurID);
          }
        }

        _getSkinID() {
          this._playerSkinCurID = sys.localStorage.getItem('player');
          this._blockSkinCurID = sys.localStorage.getItem('block');
          this._playerSkinCurID ? this._setSkin('player', this._playerSkinCurID) : this._playerSkinCurID = 2;
          this._blockSkinCurID ? this._setSkin('block', this._blockSkinCurID) : this._blockSkinCurID = 2;
        }

        _setSkin(model, skinID) {
          if (model === 'player') {
            this._playerMesh.setMaterial(this._playerMesh.getMaterial(skinID), 0);
          } else if (model === 'block') {
            this._blockMesh.setMaterial(this._blockMesh.getMaterial(skinID), 0);
          }
        }

        _storageData(key, val) {
          sys.localStorage.setItem(key, val);
          log(key + " skin ID: " + sys.localStorage.getItem(key) + " stored");
        }

        showGuide() {
          this.guideNode.active = true;
        }

        hideGuide() {
          this.guideNode.active = false;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "guideNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadingNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec6], {
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
//# sourceMappingURL=MenuUIManager.js.map