
import {picType} from "./cfg"
const { ccclass, property } = cc._decorator;

@ccclass
export default class cell extends cc.Component {
    @property([cc.SpriteFrame])
    pic: Array<cc.SpriteFrame> = []
    pictype:picType
    //声明下x,y属性以便于确定元素位置
    x:number
    y:number
    choose(pictype: picType) {
        this.pictype=pictype;
        let type = this.node.getChildByName("frame").getComponent(cc.Sprite);
        // switch(pictype){
        //     case picType.snakeHead:
        //     type.spriteFrame=this.pic[0];
        //     break;
        //     case picType.snakeBody1:
        //     type.spriteFrame=this.pic[1];
        //     break;
        //     case picType.snakeBody2:
        //     type.spriteFrame=this.pic[2];
        //     break;
        //     case picType.snakeTail:
        //     type.spriteFrame=this.pic[3];
        //     break;
        // }
        type.spriteFrame = this.pic[this.pictype];
        // return this.pictype
    }
    // onLoad(){
    //     this.choose(picType.null);
    // }

}
