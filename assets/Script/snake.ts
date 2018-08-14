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
    //通过一下方式来创造节点
    @property(cc.Node)
    private bg: cc.Node = null
    //声明一个预制体来方便我们选定之前制作的预制体
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
            //为了制作背景我们需要创建一共16*16个预制体节点以放入16*16个background数组中
            //就像16*16个格子里对应了16*16个物体
            for (let j = 0; j < bgHeight; j++) {
                //为了使用预制体，我们将预制体做成节点以方便使用
                //使用instantiate来进行操作
                let node = cc.instantiate(this.cellPfb);
                //为了使用我们还要明确他的父节点也就是他在什么地方被使用
                //详情看cccreator文档脚本内容里创建和删除节点
                node.parent = this.bg;
                //使得每个元素都能在我设置的背景图片的格子正中间
                //node.x/node.y就是节点的锚点坐标
                node.x = i * this.cellwid + this.cellwid / 2;
                node.y = j * this.cellhei + this.cellhei / 2;
                //为background中的元素赋值
                //我们需要的backGround中第i,j个元素是预制体节点的cell组件
                //这样这个元素就包含了cell中的各个属性
                this.backGround[i][j] = node.getComponent(cell);
                //因此我们可以利用cell中的改变函数来选择显示的图片
                this.backGround[i][j].choose(0);
                //在初始化时就定义x,y的属性使他们等于用来遍历的i,j
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
    //移动的本质是将下个元素显示为所需要的图片并将之前的元素图片更改
    snakemove(systemEvent) {
        switch (systemEvent.keyCode) {
            case cc.KEY.s:
                console.log("s")
                for (let i = 0; i < bgWitdh; i++) {
                    for (let j = 0; j < bgHeight; j++) {
                        if (this.backGround[i][j].pictype === picType.snakeHead) {
                            //为了能够做到当蛇的图片覆盖掉食物时能够及时刷新食物
                            //每一步需要做出判断当没有食物是正常操作
                            if (this.backGround[i][j - 1].pictype !== picType.Food) {
                                this.backGround[i][j - 1].choose(1);
                            }
                            //有食物时需要三步操作
                            else {
                                //第一步，将被覆盖掉的食物从数组中删除
                                this.delfood(i, j - 1);
                                //第二部添加一个新的食物
                                this.foodAdd();
                                //第三部，将此时的图片更改
                                this.backGround[i][j - 1].choose(1);
                            }

                            this.backGround[i][j].choose(0);
                            //注意要加return以跳出循环。。。否则后果很尴尬
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
                                this.backGround[i - 1][j].choose(1);
                            }
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
                                this.backGround[i + 1][j].choose(1);
                            }
                            this.backGround[i][j].choose(0);
                            return;
                        }
                    }
                }
                break;
        }
    }
    //为了确定删除foodlist数组中的哪个元素，我们可以利用元素的x,y属性即坐标
    //为了能够利用坐标属性x,y我们要为这个函数加入x,y参数以便穿入x，y坐标
    //我们要删除foodlist中的元素，所以要遍历foodlist来找出要删除的元素
    delfood(x: number, y: number) {
        for (let i = 0; i < this.foodlist.length; i++) {
            //我们能够得知要删除的元素的x,y坐标属性为我们传入的x,y值
            //当我们找到这个元素时，我们也就知道了他在foodlist中的位置i
            if (this.foodlist[i].x === x && this.foodlist[i].y === y) {
                //要删除这个元素需要两个步骤
                //第一更改这个元素所在位置的图片
                this.foodlist[i].choose(0);
                //第二将这个元素从foodlist数组中删除
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
