
import { _decorator, Component, Node, log, find, instantiate, Prefab, resources, Vec3, director, game, sys, SkinnedMeshRenderer, MeshRenderer } from 'cc';
const { ccclass, property } = _decorator;

enum GameState {
    INIT = 'init', // 初始化完成
    READY = 'ready',
    GAME_OVER = 'game-over', // 未到达终点，游戏失败
    CHECK_POINT = 'check-point', // 成功到达终点，游戏胜利
}

enum InGameState {
    STOP_MOVING = 'stop-moving',
    START_MOVING = 'start-moving',
    LOAD_SCORE = 'load-score',
    SCORE_ADDED = 'score-added',
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    modelsNode: Node = null!
    @property(Node)
    bridgesNode: Node = null!
    @property(Node)
    cratesNode: Node = null!
    @property(Node)
    blocksNode: Node = null!
    @property(Node)
    coinsNode: Node = null!

    private _playerSkinID: number | null = null
    private _blockSkinID: number | null = null
    private _spawnList: any[] = []

    public static InGameState = InGameState
    public static GameState = GameState

    start () {
        this._getSkinID()
        this._initLevel()
        director.on(GameState.INIT, this._initLevel, this)
    }


    private _initLevel() {
        this._clearLevel()

        this.scheduleOnce(() => {
            this._generateSpawnList()
            this._spawnResourceByList(this._spawnList)
        }, 1)
    }


    private _clearLevel() {
        this.bridgesNode.destroyAllChildren()
        this.cratesNode.destroyAllChildren()
        this.blocksNode.destroyAllChildren()
        this.coinsNode.destroyAllChildren()

        let playerNode: Node | null = this.modelsNode.getChildByName("PlayerNode")
        let checkPointNode: Node | null = this.modelsNode.getChildByName("CheckPoint")
        if (playerNode) playerNode.destroy()
        if (checkPointNode) checkPointNode.destroy()
    }



    private _generateSpawnList() {

        let min_bridge: number = 60 // 桥数量
        let min_crates: number = Math.floor(min_bridge / 8) // 木箱（障碍物）数量
        let min_blocks: number = Math.floor(min_bridge / 5) // 方块数量
        let min_coins: number = Math.floor(min_bridge / 10) // 硬币数量

        let cur_crates: number = 0 // 当前木箱数量
        let cur_blocks: number = 0
        let cur_coins: number = 0

         // 0：只生成桥, 1：生成桥和木箱, 2：生成桥和方块, 3：生成桥和硬币
        let randomNum: number = 0

        for (let i=0; this._spawnList.length !== min_bridge; i++) {
            
            randomNum = Math.floor(Math.random() * 4)
            switch(randomNum) {
                case 0:
                    this._spawnList[i] = {"bridge": true}
                    break

                case 1:
                    if (cur_crates < min_crates && i > 15) { // 15 块桥后再生成木箱
                        this._spawnList[i] = {"bridge": true, "crate": true}
                        cur_crates ++
                        break
                    } else {
                        this._spawnList[i] = {"bridge": true}
                        break
                    }

                case 2:
                    if (cur_blocks < min_blocks && i > 3) { // 3 块桥后再生成方块
                        this._spawnList[i] = {"bridge": true, "block": {"xPos": this._getRandomXPos()}}
                        cur_blocks ++
                        break
                    } else {
                        this._spawnList[i] = {"bridge": true}
                        break
                    }

                case 3:
                    if (cur_coins < min_coins && i > 20) { // 20 块桥后再生成硬币
                        this._spawnList[i] = {"bridge": true, "coin": {"xPos": this._getRandomXPos()}}
                        cur_coins ++
                        break
                    } else {
                        this._spawnList[i] = {"bridge": true}
                        break
                    }

            }
        }

        log("spawnList", this._spawnList)

    }


    private _spawnResourceByList(list: any[]) {
        if (!list) { // 如果没传参
            list = this._spawnList
        }

        let curZPos: number = 0

        // 先加载玩家节点 prefab
        this._loadResource("PlayerNode", this.modelsNode, new Vec3(0, 0, 0))

        for (let i=0; i<list.length; i++) {
            // 加载桥和木箱 prefab
            if (list[i].crate) {
                let pos: Vec3 = new Vec3(0, 0, curZPos)
                this._loadResource("bridge_1_row", this.bridgesNode, pos)

                let randomCrate: number = Math.ceil(Math.random() * 6)
                this._loadResource(`crates_${randomCrate}`, this.cratesNode, pos)

                curZPos ++

            // 加载桥和方块 prefab
            } else if (list[i].block) {
                let bridgePos: Vec3 = new Vec3(0, 0, curZPos)
                this._loadResource("bridge_1_row", this.bridgesNode, bridgePos)


                let xPos: number = list[i].block.xPos
                let blockPos: Vec3 = new Vec3(xPos, 0.6, curZPos)
                this._loadResource("block", this.blocksNode, blockPos)
                
                curZPos ++

            // 加载桥和硬币 prefab
            } else if (list[i].coin) {
                let bridgePos: Vec3 = new Vec3(0, 0, curZPos)
                this._loadResource("bridge_1_row", this.bridgesNode, bridgePos)


                let xPos: number = list[i].coin.xPos
                let coinPos: Vec3 = new Vec3(xPos, 0.7, curZPos)
                this._loadResource("coin", this.coinsNode, coinPos)
                
                curZPos ++

            // 仅加载桥 prefab
            } else {
                let bridgePos: Vec3 = new Vec3(0, 0, curZPos)
                this._loadResource("bridge_1_row", this.bridgesNode, bridgePos)

                curZPos ++
            }
        }

        
        // 加载终点 prefab
        this._loadResource("CheckPoint", this.modelsNode, new Vec3(0, 0, curZPos))

        
        this.scheduleOnce(() => {
            director.emit(InGameState.START_MOVING)
        }, 0.5)
    }


    // 随机返回 0、1、-1
    private _getRandomXPos(): number {
        let randomXPos: number = Math.floor(Math.random() * 3)
        if (randomXPos === 2) return -1
        return randomXPos
    }


    private _getSkinID() {
        this._playerSkinID = sys.localStorage.getItem('player')
        this._blockSkinID = sys.localStorage.getItem('block')
    }

    
    private _setSkin(node: Node) {
        if (node.name === 'player' && this._playerSkinID) {
            const playerMesh: SkinnedMeshRenderer = node.getComponent(SkinnedMeshRenderer)!
            playerMesh.setMaterial(playerMesh.getMaterial(this._playerSkinID), 0)
            playerMesh.setMaterial(playerMesh.getMaterial(this._playerSkinID), 1)

        } else if (node.name === 'block' && this._blockSkinID) {
            const blockMesh: MeshRenderer = node.getComponent(MeshRenderer)!
            blockMesh.setMaterial(blockMesh.getMaterial(this._blockSkinID), 0)
            blockMesh.setMaterial(blockMesh.getMaterial(this._blockSkinID), 1)
        }
    }


    private _loadResource(prefabName: string, parentNode: Node, pos: Vec3) {
        let node: Node = null!

        resources.load(prefabName, Prefab, (err: any, prefab: Prefab) => {
            if (err) {
                log("prefab err:", err)
                return
            }

            node = instantiate(prefab) as Node
            node.setParent(parentNode)
            node.setPosition(pos)
            
            
            if (prefabName === 'PlayerNode') {
                if (this._playerSkinID) {
                    let player: Node = node.getChildByPath('player/player')!
                    this._setSkin(player)
                }

                if (this._blockSkinID) {
                    let block: Node = node.getChildByPath('block/block')!
                    this._setSkin(block)
                }

                node.active = true

            } else if (prefabName === 'block' && this._blockSkinID) {
                let block: Node = node.getChildByPath('block')!
                this._setSkin(block)
                node.active = true
            }
        })

    }

    

}