import { bgWitdh, bgHeight, picType } from "./cfg"
import cell from "./cell";

//枚举类型写在类外部
// enum snakeForm {
//     head = 0,
//     body = 1,
//     tail = 2
// }

const { ccclass, property } = cc._decorator;
@ccclass
export default class snake extends cc.Component {
    @property(cc.Node)
    private bg: cc.Node = null
    @property(cc.Prefab)
    private cellPfb: cc.Prefab = null

    private snakeBody: cell[] = [];
    private foodlist: cell[] = [];
    private backGround: cell[][] = [];
    private cellwid: number;
    private cellhei: number;
    private bgframe: cell;


    init() {
        this.cellwid = this.bg.width / bgWitdh;
        this.cellhei = this.bg.height / bgHeight;
        // node.getComponent(cell);
        for (let i = 0; i < bgWitdh; i++) {
            this.backGround[i] = [];
            for (let j = 0; j < bgHeight; j++) {
                let node = cc.instantiate(this.cellPfb);
                node.parent = this.bg;
                node.x = i * this.cellwid + this.cellwid / 2;
                node.y = j * this.cellhei + this.cellhei / 2;
                this.backGround[i][j] = node.getComponent(cell);
                this.backGround[i][j].choose(0);
                this.backGround[i][j].x = i;
                this.backGround[i][j].y = j;
            }
        }

        this.backGround[3][5].choose(1);
        // this.snakeBody.push(this.backGround[3][5]);
        this.foodAdd();
    }
    foodAdd() {
        let blanklist: cell[] = [];
        for (let i = 0; i < bgWitdh; i++) {
            for (let j = 0; j < bgHeight; j++) {
                if (this.backGround[i][j].pictype === picType.null) {
                    blanklist.push(this.backGround[i][j]);
                }
            }
        }
        this.foodlist.push(blanklist[Math.random() * blanklist.length | 0])
        for (let i = 0; i < this.foodlist.length; ++i) {
            this.foodlist[i].choose(5)
        }
        // list[Math.random() *list.length | 0].choose(5);
    }
    snakemove(systemEvent) {
        switch (systemEvent.keyCode) {
            case cc.KEY.s:
                console.log("s")
                for (let i = 0; i < bgWitdh; i++) {
                    for (let j = 0; j < bgHeight; j++) {
                        if (this.backGround[i][j].pictype === picType.snakeHead) {
                            if (this.backGround[i][j - 1].pictype !== picType.Food) {
                                this.backGround[i][j - 1].choose(1);
                            }
                            else {
                                this.delfood(i, j - 1);
                                this.foodAdd();
                            }
                            this.backGround[i][j - 1].choose(1);
                            this.backGround[i][j].choose(0);
                            return;
                        }
                    }
                }
                break;
            case cc.KEY.w:
                console.log("w")
                for (let i = 0; i < bgWitdh; i++) {
                    for (let j = 0; j < bgHeight; j++) {
                        if (this.backGround[i][j].pictype === picType.snakeHead) {
                            if (this.backGround[i][j + 1].pictype !== picType.Food) {
                                this.backGround[i][j + 1].choose(1);
                            }
                            else {
                                this.delfood(i, j + 1);
                                this.foodAdd();
                                this.backGround[i][j + 1].choose(1);
                            }

                            this.backGround[i][j].choose(0);
                            console.log(i + 1);
                            return;
                        }
                    }
                }
                break;
            case cc.KEY.a:
                console.log("a");
                for (let i = 0; i < bgWitdh; i++) {
                    for (let j = 0; j < bgHeight; j++) {
                        if (this.backGround[i][j].pictype === picType.snakeHead) {
                            if (this.backGround[i - 1][j].pictype !== picType.Food) {
                                this.backGround[i - 1][j].choose(1);
                            }
                            else {
                                this.delfood(i - 1, j);
                                this.foodAdd();
                            }
                            this.backGround[i - 1][j].choose(1);
                            this.backGround[i][j].choose(0);
                            return;
                        }
                    }
                }
                break;
            case cc.KEY.d:
                console.log("d")
                for (let i = 0; i < bgWitdh; i++) {
                    for (let j = 0; j < bgHeight; j++) {
                        if (this.backGround[i][j].pictype === picType.snakeHead) {
                            if (this.backGround[i + 1][j].pictype !== picType.Food) {
                                this.backGround[i + 1][j].choose(1);
                            }
                            else {
                                this.delfood(i + 1, j);
                                this.foodAdd();
                            }
                            this.backGround[i + 1][j].choose(1);
                            this.backGround[i][j].choose(0);
                            return;
                        }
                    }
                }
                break;
        }
    }
    delfood(x: number, y: number) {
        for (let i = 0; i < this.foodlist.length; i++) {
            if (this.foodlist[i].x === x && this.foodlist[i].y === y) {
                this.foodlist[i].choose(0);
                this.foodlist.splice(i, 1);
                return;
            }
        }


    }
    snakeAdd() {
        // this.snakeBody[0] = snakeForm.body;
        // this.snakeBody.unshift(snakeForm.head);
    }
    snakeTouch() {

    }
    onLoad() {
        this.init();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.snakemove, this);

        // for (let i = 0; i < bgWitdh; i++) {
        //     this.backGround[i] = [];
        //     for (let j = 0; j < bgHeight; j++) {
        //         this.backGround[i][j]

        //     }
        // }
        // this.snakeBody[0] = snakeForm.head;
        // this.snakeBody[1] = snakeForm.body;
        // this.snakeBody[2] = snakeForm.body;
        // this.snakeBody[3] = snakeForm.tail;
        // this.backGround[1][1] = this.snakeBody[0];

    }
    update() {
        // this.resetfood();
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.snakemove, this);
    }

}
