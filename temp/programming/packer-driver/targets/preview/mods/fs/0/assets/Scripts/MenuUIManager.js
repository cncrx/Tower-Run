System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, director, log, MeshRenderer, sys, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, _crd, ccclass, property, MenuUIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("MenuUIManager", MenuUIManager = (_dec = ccclass('MenuUIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MenuUIManager, _Component);

        function MenuUIManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "mainNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "guideNode", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadingNode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "player", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "block", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_playerSkinCurID", 1);

          _defineProperty(_assertThisInitialized(_this), "_playerSkinMaxID", 4);

          _defineProperty(_assertThisInitialized(_this), "_blockSkinCurID", 1);

          _defineProperty(_assertThisInitialized(_this), "_blockSkinMaxID", 5);

          _defineProperty(_assertThisInitialized(_this), "_playerMesh", null);

          _defineProperty(_assertThisInitialized(_this), "_blockMesh", null);

          return _this;
        }

        var _proto = MenuUIManager.prototype;

        _proto.start = function start() {
          this._playerMesh = this.player.getComponent(MeshRenderer);
          this._blockMesh = this.block.getComponent(MeshRenderer);

          this._getSkinID();
        };

        _proto.startGame = function startGame() {
          this.mainNode.active = false;
          this.guideNode.active = false;
          this.loadingNode.active = true;
          director.preloadScene("game", function () {
            log('game scene pre loaded');
          });
          this.scheduleOnce(function () {
            director.loadScene("game", function () {
              log('game scene loaded');
            });
          }, 2); // 给 2 秒等加载条走完
        };

        _proto.changeSkin = function changeSkin(e, params) {
          var model = params.split(';')[0];
          var action = params.split(';')[1];

          if (model === 'player') {
            if (action === 'perv') this._playerSkinCurID === 2 ? this._playerSkinCurID = this._playerSkinMaxID : this._playerSkinCurID--;else if (action === 'next') this._playerSkinCurID === this._playerSkinMaxID ? this._playerSkinCurID = 2 : this._playerSkinCurID++;

            this._setSkin('player', this._playerSkinCurID);

            this._storageData('player', this._playerSkinCurID);
          } else if (model === 'block') {
            if (action === 'perv') this._blockSkinCurID === 2 ? this._blockSkinCurID = this._blockSkinMaxID : this._blockSkinCurID--;else if (action === 'next') this._blockSkinCurID === this._blockSkinMaxID ? this._blockSkinCurID = 2 : this._blockSkinCurID++;

            this._setSkin('block', this._blockSkinCurID);

            this._storageData('block', this._blockSkinCurID);
          }
        };

        _proto._getSkinID = function _getSkinID() {
          this._playerSkinCurID = sys.localStorage.getItem('player');
          this._blockSkinCurID = sys.localStorage.getItem('block');
          this._playerSkinCurID ? this._setSkin('player', this._playerSkinCurID) : this._playerSkinCurID = 2;
          this._blockSkinCurID ? this._setSkin('block', this._blockSkinCurID) : this._blockSkinCurID = 2;
        };

        _proto._setSkin = function _setSkin(model, skinID) {
          if (model === 'player') {
            this._playerMesh.setMaterial(this._playerMesh.getMaterial(skinID), 0);
          } else if (model === 'block') {
            this._blockMesh.setMaterial(this._blockMesh.getMaterial(skinID), 0);
          }
        };

        _proto._storageData = function _storageData(key, val) {
          sys.localStorage.setItem(key, val);
          log(key + " skin ID: " + sys.localStorage.getItem(key) + " stored");
        };

        _proto.showGuide = function showGuide() {
          this.guideNode.active = true;
        };

        _proto.hideGuide = function hideGuide() {
          this.guideNode.active = false;
        };

        return MenuUIManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "guideNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadingNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=MenuUIManager.js.map