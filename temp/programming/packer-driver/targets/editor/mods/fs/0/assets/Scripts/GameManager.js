System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, log, instantiate, Prefab, resources, Vec3, director, sys, SkinnedMeshRenderer, MeshRenderer, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp, _crd, ccclass, property, GameState, InGameState, GameManager;

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
      log = _cc.log;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      Vec3 = _cc.Vec3;
      director = _cc.director;
      sys = _cc.sys;
      SkinnedMeshRenderer = _cc.SkinnedMeshRenderer;
      MeshRenderer = _cc.MeshRenderer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8d3454KA45PfoEtr3m56WdP", "GameManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      (function (GameState) {
        GameState["INIT"] = "init";
        GameState["READY"] = "ready";
        GameState["GAME_OVER"] = "game-over";
        GameState["CHECK_POINT"] = "check-point";
      })(GameState || (GameState = {}));

      (function (InGameState) {
        InGameState["STOP_MOVING"] = "stop-moving";
        InGameState["START_MOVING"] = "start-moving";
        InGameState["LOAD_SCORE"] = "load-score";
        InGameState["SCORE_ADDED"] = "score-added";
      })(InGameState || (InGameState = {}));

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = _class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "modelsNode", _descriptor, this);

          _initializerDefineProperty(this, "bridgesNode", _descriptor2, this);

          _initializerDefineProperty(this, "cratesNode", _descriptor3, this);

          _initializerDefineProperty(this, "blocksNode", _descriptor4, this);

          _initializerDefineProperty(this, "coinsNode", _descriptor5, this);

          _defineProperty(this, "_playerSkinID", null);

          _defineProperty(this, "_blockSkinID", null);

          _defineProperty(this, "_spawnList", []);
        }

        start() {
          this._getSkinID();

          this._initLevel();

          director.on(GameState.INIT, this._initLevel, this);
        }

        _initLevel() {
          this._clearLevel();

          this.scheduleOnce(() => {
            this._generateSpawnList();

            this._spawnResourceByList(this._spawnList);
          }, 1);
        }

        _clearLevel() {
          this.bridgesNode.destroyAllChildren();
          this.cratesNode.destroyAllChildren();
          this.blocksNode.destroyAllChildren();
          this.coinsNode.destroyAllChildren();
          let playerNode = this.modelsNode.getChildByName("PlayerNode");
          let checkPointNode = this.modelsNode.getChildByName("CheckPoint");
          if (playerNode) playerNode.destroy();
          if (checkPointNode) checkPointNode.destroy();
        }

        _generateSpawnList() {
          let min_bridge = 60; // 桥数量

          let min_crates = Math.floor(min_bridge / 8); // 木箱（障碍物）数量

          let min_blocks = Math.floor(min_bridge / 5); // 方块数量

          let min_coins = Math.floor(min_bridge / 10); // 硬币数量

          let cur_crates = 0; // 当前木箱数量

          let cur_blocks = 0;
          let cur_coins = 0; // 0：只生成桥, 1：生成桥和木箱, 2：生成桥和方块, 3：生成桥和硬币

          let randomNum = 0;

          for (let i = 0; this._spawnList.length !== min_bridge; i++) {
            randomNum = Math.floor(Math.random() * 4);

            switch (randomNum) {
              case 0:
                this._spawnList[i] = {
                  "bridge": true
                };
                break;

              case 1:
                if (cur_crates < min_crates && i > 15) {
                  // 15 块桥后再生成木箱
                  this._spawnList[i] = {
                    "bridge": true,
                    "crate": true
                  };
                  cur_crates++;
                  break;
                } else {
                  this._spawnList[i] = {
                    "bridge": true
                  };
                  break;
                }

              case 2:
                if (cur_blocks < min_blocks && i > 3) {
                  // 3 块桥后再生成方块
                  this._spawnList[i] = {
                    "bridge": true,
                    "block": {
                      "xPos": this._getRandomXPos()
                    }
                  };
                  cur_blocks++;
                  break;
                } else {
                  this._spawnList[i] = {
                    "bridge": true
                  };
                  break;
                }

              case 3:
                if (cur_coins < min_coins && i > 20) {
                  // 20 块桥后再生成硬币
                  this._spawnList[i] = {
                    "bridge": true,
                    "coin": {
                      "xPos": this._getRandomXPos()
                    }
                  };
                  cur_coins++;
                  break;
                } else {
                  this._spawnList[i] = {
                    "bridge": true
                  };
                  break;
                }

            }
          }

          log("spawnList", this._spawnList);
        }

        _spawnResourceByList(list) {
          if (!list) {
            // 如果没传参
            list = this._spawnList;
          }

          let curZPos = 0; // 先加载玩家节点 prefab

          this._loadResource("PlayerNode", this.modelsNode, new Vec3(0, 0, 0));

          for (let i = 0; i < list.length; i++) {
            // 加载桥和木箱 prefab
            if (list[i].crate) {
              let pos = new Vec3(0, 0, curZPos);

              this._loadResource("bridge_1_row", this.bridgesNode, pos);

              let randomCrate = Math.ceil(Math.random() * 6);

              this._loadResource(`crates_${randomCrate}`, this.cratesNode, pos);

              curZPos++; // 加载桥和方块 prefab
            } else if (list[i].block) {
              let bridgePos = new Vec3(0, 0, curZPos);

              this._loadResource("bridge_1_row", this.bridgesNode, bridgePos);

              let xPos = list[i].block.xPos;
              let blockPos = new Vec3(xPos, 0.6, curZPos);

              this._loadResource("block", this.blocksNode, blockPos);

              curZPos++; // 加载桥和硬币 prefab
            } else if (list[i].coin) {
              let bridgePos = new Vec3(0, 0, curZPos);

              this._loadResource("bridge_1_row", this.bridgesNode, bridgePos);

              let xPos = list[i].coin.xPos;
              let coinPos = new Vec3(xPos, 0.7, curZPos);

              this._loadResource("coin", this.coinsNode, coinPos);

              curZPos++; // 仅加载桥 prefab
            } else {
              let bridgePos = new Vec3(0, 0, curZPos);

              this._loadResource("bridge_1_row", this.bridgesNode, bridgePos);

              curZPos++;
            }
          } // 加载终点 prefab


          this._loadResource("CheckPoint", this.modelsNode, new Vec3(0, 0, curZPos));

          this.scheduleOnce(() => {
            director.emit(InGameState.START_MOVING);
          }, 0.5);
        } // 随机返回 0、1、-1


        _getRandomXPos() {
          let randomXPos = Math.floor(Math.random() * 3);
          if (randomXPos === 2) return -1;
          return randomXPos;
        }

        _getSkinID() {
          this._playerSkinID = sys.localStorage.getItem('player');
          this._blockSkinID = sys.localStorage.getItem('block');
        }

        _setSkin(node) {
          if (node.name === 'player' && this._playerSkinID) {
            const playerMesh = node.getComponent(SkinnedMeshRenderer);
            playerMesh.setMaterial(playerMesh.getMaterial(this._playerSkinID), 0);
            playerMesh.setMaterial(playerMesh.getMaterial(this._playerSkinID), 1);
          } else if (node.name === 'block' && this._blockSkinID) {
            const blockMesh = node.getComponent(MeshRenderer);
            blockMesh.setMaterial(blockMesh.getMaterial(this._blockSkinID), 0);
            blockMesh.setMaterial(blockMesh.getMaterial(this._blockSkinID), 1);
          }
        }

        _loadResource(prefabName, parentNode, pos) {
          let node = null;
          resources.load(prefabName, Prefab, (err, prefab) => {
            if (err) {
              log("prefab err:", err);
              return;
            }

            node = instantiate(prefab);
            node.setParent(parentNode);
            node.setPosition(pos);

            if (prefabName === 'PlayerNode') {
              if (this._playerSkinID) {
                let player = node.getChildByPath('player/player');

                this._setSkin(player);
              }

              if (this._blockSkinID) {
                let block = node.getChildByPath('block/block');

                this._setSkin(block);
              }

              node.active = true;
            } else if (prefabName === 'block' && this._blockSkinID) {
              let block = node.getChildByPath('block');

              this._setSkin(block);

              node.active = true;
            }
          });
        }

      }, _defineProperty(_class3, "InGameState", InGameState), _defineProperty(_class3, "GameState", GameState), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "modelsNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bridgesNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cratesNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "blocksNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "coinsNode", [_dec6], {
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
//# sourceMappingURL=GameManager.js.map