
import { _decorator, Component, Node, BoxCollider, ITriggerEvent, log, director, find, SkeletalAnimation } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    
    private _checkPointNode: Node = null!
    private _isGameOver: boolean = false

    start () {
        const playerAnim = this.node.getComponent(SkeletalAnimation)!
        playerAnim.play('Root|Run')

        director.on(GameManager.GameState.GAME_OVER, () => {
            playerAnim.play('Root|Idle')
        }, this)
        director.on(GameManager.GameState.CHECK_POINT, () => {
            playerAnim.play('Root|Idle')
        }, this)

        let collider = this.node.getComponent(BoxCollider)!
        collider.on('onCollisionEnter', this._onCollisionEnter, this)

        // 延迟 2 秒等检查点预制加载完
        this.scheduleOnce(() => {
            this._checkPointNode = find('Models/CheckPoint')!
        }, 2)
    }


    update(dt: number) {
        // 小人掉下桥，游戏结束
        if (this.node.getWorldPosition().y < 0 && !this._isGameOver) {
            this._gameOver()
        }
    }


    private _onCollisionEnter(event: ITriggerEvent) {
         // 小人碰撞到木箱，游戏结束
        if (event.otherCollider.name === 'crate<BoxCollider>' && !this._isGameOver) {
            this._gameOver()

        // 小人碰撞到桥，游戏结束
        } else if (event.otherCollider.name === 'bridge_1_row<BoxCollider>' && !this._isGameOver) {
            if (event.otherCollider.node.isChildOf(this._checkPointNode)) {
                return
            }
            this._gameOver()
        }
    }


    private _gameOver() {
        this._isGameOver = true
        director.emit(GameManager.InGameState.STOP_MOVING)
        director.emit(GameManager.GameState.GAME_OVER)
    }
 


}