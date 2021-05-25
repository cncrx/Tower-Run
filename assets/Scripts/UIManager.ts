
import { _decorator, Component, Node, director, resources, Prefab, log, instantiate, Vec3, find, Label, Animation, game } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Node)
    scoreLabel: Node = null!

    @property(Node)
    gameOverNode: Node = null!
    @property(Label)
    gameOverTitle: Label = null!
    @property(Label)
    totalScoreLabel: Label = null!


    private _curScore: number = 0
    

    start () {
        director.on(GameManager.InGameState.LOAD_SCORE, this._loadScore, this)
        director.on(GameManager.InGameState.SCORE_ADDED, this._scoreAdded, this)

        director.on(GameManager.GameState.GAME_OVER, this._showGameOverUI, this)
        director.on(GameManager.GameState.CHECK_POINT, this._showGameOverUI, this)
    }


    private _loadScore(scoreNum: number, pos: Vec3, isCoin: boolean = false) {
        resources.load("score", Prefab, (err: any, prefab: Prefab) => {
            if (err) {
                log("prefab err:", err)
                return
            }

            let score: Node = instantiate(prefab)
            score.getComponent(Label)!.string = isCoin ? `额外分数！+ ${scoreNum}` : `+ ${scoreNum}`
            score.setParent(find("Canvas/UI"))
            score.setPosition(pos)

        })
        
    }


    private _scoreAdded(scoreNum: number) {
        let label = this.scoreLabel.getComponent(Label)!
        this._curScore = Number(label.string) + scoreNum
        label.string = String(this._curScore)

        let anim = this.scoreLabel.getComponent(Animation)!
        anim.play("score_added")
    }


    private _showGameOverUI(win: boolean = false) {
        this.scheduleOnce(() => {
            this.gameOverTitle.string = win ? "游戏胜利" : "游戏失败"
            this.totalScoreLabel.string = `本局得分：${this._curScore} 分`
            this.gameOverNode.active = true
        }, 1.5)
    }


    private playAgain() {
        let label = this.scoreLabel.getComponent(Label)!
        label.string = "0000"

        this.gameOverNode.active = false
        director.emit(GameManager.GameState.INIT)
    }


    private gotoMenu() {
        director.loadScene("menu", () => {
            log('menu scene loaded')
        })
    }


    
}