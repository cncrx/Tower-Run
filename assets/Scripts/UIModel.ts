
import { _decorator, Component, Node, Vec3, log, find, SkinnedMeshRenderer, Material, MeshRenderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIModel')
export class UIModel extends Component {

    private _isRotate: boolean = true

    start () {
        
    } 

    update(dt: number) {
        if (this._isRotate) {
            let pos: Vec3 = this.node.eulerAngles
            pos.y += 50 * dt
            this.node.setRotationFromEuler(pos)
        }
    }
    
}