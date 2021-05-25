System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./GameManager"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, BoxCollider, find, RigidBody, director, GameManager, _dec, _class, _temp, _crd, ccclass, property, Block;

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

      ({
        ccclass,
        property
      } = _decorator);

      _export("Block", Block = (_dec = ccclass('Block'), _dec(_class = (_temp = class Block extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_isReady", false);

          _defineProperty(this, "isPlayerNodeChild", false);

          _defineProperty(this, "_parentNode", null);
        }

        start() {
          this._parentNode = find("Models/PlayerNode");
          this.isPlayerNodeChild = this.node.isChildOf(this._parentNode);
          let collider = this.getComponent(BoxCollider);
          collider.on('onCollisionEnter', this._onCollisionEnter, this);
        }

        _onCollisionEnter(event) {
          if (event.otherCollider.name === 'block<BoxCollider>') {
            // 跟方块碰撞
            let otherBlock = event.otherCollider.node;
            let otherBlockComp = otherBlock.getComponent(Block);

            if (otherBlockComp.isPlayerNodeChild) {
              // 碰撞方块已经加进父节点，是兄弟节点则不用处理
              return;
            } else if (this.isPlayerNodeChild && !otherBlockComp.isPlayerNodeChild) {
              // 碰撞方块不是兄弟节点，则加进父节点 
              director.emit((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).InGameState.STOP_MOVING); // 碰撞开始，PlayerCtrl 停止运动

              let curParentPos = this._parentNode.getPosition(); // 碰撞开始时父节点的位置


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
            let selfWorldPos = this.node.getWorldPosition();
            let otherBlockWorldPos = event.otherCollider.node.getWorldPosition();
            let selfWorldPosY = Math.floor(selfWorldPos.y * 10) / 10;
            let otherBlockWorldPosY = Math.floor(otherBlockWorldPos.y * 10) / 10;

            if (Math.abs(otherBlockWorldPosY - selfWorldPosY) < 0.3) {
              // 方块跟木箱在同一水平面上(误差不超过 0.3)才要处理碰撞
              let rigidBody = this.node.getComponent(RigidBody);
              rigidBody.sleep();
              this.node.setParent(find('Models'), true); // 移到其他节点准备销毁

              this.scheduleOnce(() => {
                // 三秒后销毁
                this.node.destroy();
              }, 3);
            } else {
              return;
            }
          }
        }

      }, _temp)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Block.js.map