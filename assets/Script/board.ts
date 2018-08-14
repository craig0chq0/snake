import {bgWitdh} from "../Script/cfg"

const { ccclass, property } = cc._decorator;
//枚举类型写在类外部
enum snakeForm{
    head=0,
    body=1,
    tail=2
}
@ccclass
export default class board extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    // private backGround: number[][]=[];
    // private snakeBody:snakeForm[]=[];
    
    

    onLoad(){
        //初始化地图的二维数组
        // for (let i=0;i<bgWitdh;i++){
        //     this.backGround[i]=[];
        // }
        
        // this.snakeBody[0]=snakeForm.head;
        // this.snakeBody[1]=snakeForm.body;
        // this.snakeBody[2]=snakeForm.body;
        // this.snakeBody[3]=snakeForm.tail;
        // this.backGround[1][1]=this.snakeBody[0];
    }
    
}
