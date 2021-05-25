
import { _decorator, Component, Node, log, BoxCollider, ICollisionEvent, find, director } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('CheckPoint')
export class CheckPoint extends Component {

    private _playerNode: Node = null!
    private _isInCheckPoint: boolean = false // clearLevel set it to false again
    private _blocks: Node[] = null!
    private _timer: number = 0

    start () {
        let collider = this.getComponent(BoxCollider)!
        collider.on('onCollisionEnter', this._onCollisionEnter, this)

        this._playerNode = find('Models/PlayerNode')!
    }


    update(dt: number) {
        this._timer += dt
        if (this._timer > 1 && this._isInCheckPoint && this._blocks.length != 0) { // 逐个对方块进行结算
            let block: Node = this._blocks.pop()!
            director.emit(GameManager.InGameState.LOAD_SCORE, 3000, block.getPosition())
            block.destroy()
            this._timer = 0
            
            if (this._blocks.length == 0) {
                director.emit(GameManager.GameState.CHECK_POINT, true)
            }
        }
    }


    private _onCollisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.name === 'block<BoxCollider>' && !this._isInCheckPoint) {

            this._isInCheckPoint = true
            director.emit(GameManager.InGameState.STOP_MOVING)

            // 子节点只要 block 节点，其他过滤掉
            this._blocks = this._playerNode.children.filter((node) => {
                return node.name === "block"
            })
        }

    }


    
}
