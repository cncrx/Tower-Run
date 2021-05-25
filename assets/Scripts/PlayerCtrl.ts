
import { _decorator, Component, Node, log, director, EventTouch, view, Size, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    

    // read player and block's skin,
    // and then apply it
    // or though localStore
    // private _applySkin()


    private _moving: boolean = true
    
    // 将设备分辨率宽度分成三份，实现左中右 移动的操作
    // a < avgNum*2 < b，触摸 x 轴坐标在 a 区域，向左移动 1 单位，坐标在 avgNum 区域移回到中间，b 反之
    private _visibleSize: Size = view.getVisibleSize()
    private _avgNum: number = this._visibleSize.width / 3

    start () {
        this.node.on('touch-move', this._touchMove, this)

        director.on(GameManager.InGameState.STOP_MOVING, () => {
            this._moving = false
        }, this)
        director.on(GameManager.InGameState.START_MOVING, () => {
            this._moving = true
        }, this)

        
    }


    update(dt: number) {
        if (this._moving) {
            let pos: Vec3 = this.node.getWorldPosition()
            pos.z += 2 * dt
            this.node.setWorldPosition(pos)
        }
    }


    private _touchMove(event: EventTouch) {
        let touchX: number = event.getUILocation().x
        let pos: Vec3 = this.node.getPosition()
        
        // _avgNum: 720
        if (touchX <= this._avgNum) { // [0, 240]
            this.node.setPosition(1, pos.y, pos.z)

        } else if (touchX >= this._avgNum * 2) { // [480, 720]
            this.node.setPosition(-1, pos.y, pos.z)

        } else if (touchX >= this._avgNum && touchX <= this._avgNum * 2) { // [240, 480]
            this.node.setPosition(0, pos.y, pos.z)
        }
        
    }

}