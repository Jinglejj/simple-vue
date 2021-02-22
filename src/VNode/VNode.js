import {isArray} from "@/utils";
class VNode{
    tag; //标签名
    props; //dom属性
    children;
    count = 0;//子节点数量
    key;
    text;
    vm;
    el;
    constructor(tag,props={},children=[],vm=null){
        if(isArray(props)){
            children=props;
            props={}
        }
        this.tag=tag;
        this.props=props;
        this.children=children;
        this.vm=vm;
        this.key=props.key || void 0;
        //计算子节点数量
        let count=0;
        this.children.forEach((child,i)=>{
            count++;
            if(child instanceof VNode){
                count+=child.count;
            }else{
                children[i]=''+child;
            }
        })
        this.count=count;
    }

    addChildren(children){
        if(isArray(children)){
            children.forEach(child=>{
                if(child instanceof VNode){
                    this.count+=child.count;
                }
                this.children.push(child);
                this.count++;
            })
        }
    }
}


export const createTextVNode=(str)=>{
    const node=new VNode();
    node.text=str;
    return node;
}
export default VNode;