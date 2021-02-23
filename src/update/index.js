import VNode from '@/VNode/VNode'
import diff from "@/VNode/diff.js";
import patch from "@/VNode/patch.js";
function update(vnode){
    const vm=this;
    const {_vnode:oldVNode}=vm;
    vm._vnode=vnode;
    if(!oldVNode){//首次渲染
        const el=generateElment(vnode);
        vm.$el=el;
        document.body.appendChild(el);
    }else{
        const patches=diff(oldVNode,vnode);
        patch(vm.$el, patches);
    }
}

function generateElment(vnode){
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
        const childEl=(child instanceof VNode)?generateElment(child):document.createTextNode(child);
        if(child instanceof VNode){
            child.el=childEl;
        }
        el.appendChild(childEl);
    })
    vnode.el=el;
    return el;
}


export default update;