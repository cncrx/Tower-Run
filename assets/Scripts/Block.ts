
import { _decorator, Component, Node, BoxCollider, ICollisionEvent, log, find, Vec3, RigidBody, director, Collider } from 'cc';
import { GameManager } from './GameManager';
import { PlayerCtrl } from './PlayerCtrl';
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {

    private _isReady: boolean = false

    public isPlayerNodeChild: boolean = false
    private _parentNode: Node = null!


    start() {
        this._parentNode = find("Models/PlayerNode")!
        this.isPlayerNodeChild = this.node.isChildOf(this._parentNode)

        let collider = this.getComponent(BoxCollider)!
        collider.on('onCollisionEnter', this._onCollisionEnter, this)
    }


    private _onCollisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.name === 'block<BoxCollider>') { // 跟方块碰撞
            let otherBlock = event.otherCollider.node
            let otherBlockComp = otherBlock.getComponent(Block)!

            if (otherBlockComp.isPlayerNodeChild) { // 碰撞方块已经加进父节点，是兄弟节点则不用处理
                return

            } else if (this.isPlayerNodeChild && !otherBlockComp.isPlayerNodeChild){ // 碰撞方块不是兄弟节点，则加进父节点 

                director.emit(GameManager.InGameState.STOP_MOVING) // 碰撞开始，PlayerCtrl 停止运动
                let curParentPos: Vec3 = this._parentNode.getPosition() // 碰撞开始时父节点的位置
                director.emit(GameManager.InGameState.LOAD_SCORE, 3000, curParentPos)              

                this._parentNode.setPosition(curParentPos.x, curParentPos.y + 0.4, curParentPos.z)
                otherBlock.setPosition(curParentPos.x, 0.4, curParentPos.z)

                otherBlock.setParent(this._parentNode, true) // 设 PlayerNode 为父节点, 一起运动, true 保留当前世界坐标
                otherBlockComp.isPlayerNodeChild = true
                

                // 碰撞方块加入父节点，碰撞结束，PlayerCtrl 开始运动
                director.emit(GameManager.InGameState.START_MOVING)
                
            }

        } else if (event.otherCollider.name === 'crate<BoxCollider>') { // 跟木箱碰撞
            let selfWorldPos: Vec3 = this.node.getWorldPosition()
            let otherBlockWorldPos: Vec3 = event.otherCollider.node.getWorldPosition()
            
            let selfWorldPosY: number = Math.floor(selfWorldPos.y * 10) / 10
            let otherBlockWorldPosY: number = Math.floor(otherBlockWorldPos.y * 10) / 10

            if (Math.abs(otherBlockWorldPosY - selfWorldPosY) < 0.3) { // 方块跟木箱在同一水平面上(误差不超过 0.3)才要处理碰撞
                let rigidBody = this.node.getComponent(RigidBody)!
                rigidBody.sleep()
                this.node.setParent(find('Models'), true) // 移到其他节点准备销毁

                this.scheduleOnce(() => { // 三秒后销毁
                    this.node.destroy()
                }, 3)

            } else {
                return
            }
        }
        
    }



}