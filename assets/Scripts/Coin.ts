
import { _decorator, Component, Node, director, Vec3, log, BoxCollider, ITriggerEvent } from 'cc';
import { Block } from './Block';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {

    private _inProcess: boolean = false
    private _isAscend: boolean = false

    start() {
        let collider = this.node.getComponent(BoxCollider)!
        collider.on('onTriggerEnter', this._onTriggerEnter, this)
    }

    update(dt: number) {
        if (this._isAscend) {
            let curPos: Vec3 = this.node.getPosition()
            this.node.setPosition(curPos.x, curPos.y + 10*dt, curPos.z)
        }
        
    }


    private _onTriggerEnter(event: ITriggerEvent) {
        if (event.otherCollider.name === 'block<BoxCollider>') {
            let blockComp = event.otherCollider.node.getComponent(Block)!

            if (blockComp.isPlayerNodeChild && !this._inProcess) {
                this._inProcess = true
                director.emit(GameManager.InGameState.LOAD_SCORE, 5000, this.node.getPosition(), true)
                this._isAscend = true
                this.scheduleOnce(() => {
                    this.node.destroy()
                }, 0.8) // 给 0.8 秒灯动画播放完后销毁
            }
        }

    }

}
