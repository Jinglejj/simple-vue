import VNode from "@/VNode/VNode";
import Watcher from "../observer/Watcher";
import { getObjValueByString } from "@/utils";
const reg = /[^{}]+(?=})/g;

function render(vnode){
    const {tag,props,vm,children}=vnode;
    const el=document.createElement(tag);
    for(let prop in props){
        if (prop === "v-model") {
            const name=props[prop];
            el.addEventListener("input", (e) => {
                vm[name] = e.target.value;
            });
            el.value = vm[name];
            el.removeAttribute("v-model");
        }else{
            el.setAttribute(prop,props[prop]);
        }
    }
    children.forEach(child=>{
        const childEl=(child instanceof VNode)?child.render():createTextNode(child,vm);
        el.appendChild(childEl);
    })
    return el;
}


function createTextNode(text,vm){
    const node=document.createTextNode(text);
    const arr = node.nodeValue.match(reg);
    node.nodeValue =
      arr &&
      new Watcher(vm, node, arr) &&
      arr.map((e) => getObjValueByString(vm, e)).join(" ");
    return node;
}


export default render;