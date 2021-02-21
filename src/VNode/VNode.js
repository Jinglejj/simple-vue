import {isArray} from "@/utils";
class VNode{
    tag; //标签名
    props; //dom属性
    children;
    count = 0;//子节点数量
    key;
    constructor(tag,props={},children=[]){
        if(isArray(props)){
            children=props;
            props={}
        }
        this.tag=tag;
        this.props=props;
        this.children=children;
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

    render(){
        const el=document.createElement(this.tag);
        const props=this.props;
        for(let prop in props){
            el.setAttribute(prop,props[prop]);
        }
        const children=this.children;
        children.forEach(child=>{
            const childEl=(child instanceof VNode)?child.render():document.createTextNode(child);
            el.appendChild(childEl);
        })
        return el;
    }
}

export default VNode;