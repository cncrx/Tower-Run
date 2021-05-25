
import { _decorator, Component, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Progress')
export class Progress extends Component {
    
    private _progress: number = 0

    update(dt: number) {
        this._progress += 0.5 * dt
        if (this._progress > 1) {
            this._progress = 1
        }

        this.node.getComponent(ProgressBar)!.progress = this._progress

    }


    
}