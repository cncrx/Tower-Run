
import { _decorator, Component, Node, director, find, game, instantiate, Label, log, Prefab, resources, Vec3, MeshRenderer, sys, error } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MenuUIManager')
export class MenuUIManager extends Component {

    @property(Node)
    mainNode: Node = null!
    @property(Node)
    guideNode: Node = null!
    @property(Node)
    loadingNode: Node = null!

    @property(Node)
    player: Node = null!
    @property(Node)
    block: Node = null!


    private _playerSkinCurID: number = 1
    private _playerSkinMaxID: number = 4

    private _blockSkinCurID: number = 1
    private _blockSkinMaxID: number = 5

    private _playerMesh: MeshRenderer = null!
    private _blockMesh: MeshRenderer = null!

    start() {
        this._playerMesh = this.player.getComponent(MeshRenderer)!
        this._blockMesh = this.block.getComponent(MeshRenderer)!

        this._getSkinID()
    }


    private startGame() {
        this.mainNode.active = false
        this.guideNode.active = false
        this.loadingNode.active = true

        director.preloadScene("game", () => {
            log('game scene pre loaded')
        })

        this.scheduleOnce(() => {
            director.loadScene("game", () => {
                log('game scene loaded')
            })
        }, 2) // 给 2 秒等加载条走完
    }
    

    private changeSkin(e: Event, params: string) {
        const model: string = params.split(';')[0]
        const action: string = params.split(';')[1]
        
        if (model === 'player') {
            if (action === 'perv')
                this._playerSkinCurID === 2 ? this._playerSkinCurID = this._playerSkinMaxID : this._playerSkinCurID --

            else if (action === 'next')
                this._playerSkinCurID === this._playerSkinMaxID ? this._playerSkinCurID = 2 : this._playerSkinCurID ++

            this._setSkin('player', this._playerSkinCurID)
            this._storageData('player', this._playerSkinCurID)
        }

        else if (model === 'block') {
            if (action === 'perv')
                this._blockSkinCurID === 2 ? this._blockSkinCurID = this._blockSkinMaxID : this._blockSkinCurID --

            else if (action === 'next')
                this._blockSkinCurID === this._blockSkinMaxID ? this._blockSkinCurID = 2 : this._blockSkinCurID ++

            this._setSkin('block', this._blockSkinCurID)
            this._storageData('block', this._blockSkinCurID)
        }
    }


    private _getSkinID() {
        this._playerSkinCurID = sys.localStorage.getItem('player')
        this._blockSkinCurID = sys.localStorage.getItem('block')

        this._playerSkinCurID ? this._setSkin('player', this._playerSkinCurID) : this._playerSkinCurID = 2
        this._blockSkinCurID ? this._setSkin('block', this._blockSkinCurID) : this._blockSkinCurID = 2
    }
    

    private _setSkin(model: string, skinID: number) {
        if (model === 'player') {
            this._playerMesh.setMaterial(this._playerMesh.getMaterial(skinID), 0)
        } else if (model === 'block') {
            this._blockMesh.setMaterial(this._blockMesh.getMaterial(skinID), 0)
        }
    }


    private _storageData(key: string, val: number) {
        sys.localStorage.setItem(key, val)
        log(key + " skin ID: " + sys.localStorage.getItem(key) + " stored")
    }


    


    private showGuide() {
        this.guideNode.active = true
    }


    private hideGuide() {
        this.guideNode.active = false
    }

}