
import { _decorator, Component, Node, Vec3, find, log, Label, director } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {
    private _scoreLabel: Node = null!
    private _scoreLabelPos: Vec3 = null!
    private _scorePos: Vec3 = null!

    private _distance: number = 100

    start() {
        this._scoreLabel = find('Canvas/UI/ScoreUI/score_label')!
    }


    update(dt: number) {
        if (this._distance >= 30) {
            this._scoreLabelPos = this._scoreLabel.getWorldPosition()
            this._scorePos = this.node.getWorldPosition()

            let direction: Vec3 = this._scoreLabelPos.subtract(this._scorePos)
            this._distance = direction.length()
            direction.normalize()

            this.node.setPosition(this.node.getPosition().add(direction.multiplyScalar(650 * dt)))
        
        } else {
            let scoreNum: number = Number(this.node.getComponent(Label)!.string.slice(-4)) // 获取当前的分数
            director.emit(GameManager.InGameState.SCORE_ADDED, scoreNum)

            this.node.destroy()

        }

    }

}
