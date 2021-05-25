System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, BoxCollider, find, RigidBody, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, Block;

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
      find = _cc.find;
      RigidBody = _cc.RigidBody;
      director = _cc.director;
    }, function (_GameManager) {
      GameManager = _GameManager.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e0b49ZuHK9GcaBLXdmiqUwO", "Block", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Block", Block = (_dec = ccclass('Block'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Block, _Component);

        function Block() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_isReady", false);

          _defineProperty(_assertThisInitialized(_this), "isPlayerNodeChild", false);

          _defineProperty(_assertThisInitialized(_this), "_parentNode", null);

          return _this;
        }

        var _proto = Block.prototype;

        _proto.start = function start() {
          this._parentNode = find("Models/PlayerNode");
          this.isPlayerNodeChild = this.node.isChildOf(this._parentNode);
          var collider = this.getComponent(BoxCollider);
          collider.on('onCollisionEnter', this._onCollisionEnter, this);
        };

        _proto._onCollisionEnter = function _onCollisionEnter(event) {
          var _this2 = this;

          if (event.otherCollider.name === 'block<BoxCollider>') {
            // 跟方块碰撞
            var otherBlock = event.otherCollider.node;
            var otherBlockComp = otherBlock.getComponent(Block);

            if (otherBlockComp.isPlayerNodeChild) {
              // 碰撞方块已经加进父节点，是兄弟节点则不用处理
              return;
            } else if (this.isPlayerNodeChild && !otherBlockComp.isPlayerNodeChild) {
              // 碰撞方块不是兄弟节点，则加进父节点 
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).InGameState.STOP_MOVING); // 碰撞开始，PlayerCtrl 停止运动

              var curParentPos = this._parentNode.getPosition(); // 碰撞开始时父节点的位置


              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).InGameState.LOAD_SCORE, 3000, curParentPos);

              this._parentNode.setPosition(curParentPos.x, curParentPos.y + 0.4, curParentPos.z);

              otherBlock.setPosition(curParentPos.x, 0.4, curParentPos.z);
              otherBlock.setParent(this._parentNode, true); // 设 PlayerNode 为父节点, 一起运动, true 保留当前世界坐标

              otherBlockComp.isPlayerNodeChild = true; // 碰撞方块加入父节点，碰撞结束，PlayerCtrl 开始运动

              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).InGameState.START_MOVING);
            }
          } else if (event.otherCollider.name === 'crate<BoxCollider>') {
            // 跟木箱碰撞
            var selfWorldPos = this.node.getWorldPosition();
            var otherBlockWorldPos = event.otherCollider.node.getWorldPosition();
            var selfWorldPosY = Math.floor(selfWorldPos.y * 10) / 10;
            var otherBlockWorldPosY = Math.floor(otherBlockWorldPos.y * 10) / 10;

            if (Math.abs(otherBlockWorldPosY - selfWorldPosY) < 0.3) {
              // 方块跟木箱在同一水平面上(误差不超过 0.3)才要处理碰撞
              var rigidBody = this.node.getComponent(RigidBody);
              rigidBody.sleep();
              this.node.setParent(find('Models'), true); // 移到其他节点准备销毁

              this.scheduleOnce(function () {
                // 三秒后销毁
                _this2.node.destroy();
              }, 3);
            } else {
              return;
            }
          }
        };

        return Block;
      }(Component), _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Block.js.map