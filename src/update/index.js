import VNode from '@/VNode/VNode'
function updateComponent(vnode){
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
        const childEl=(child instanceof VNode)?updateComponent(child):document.createTextNode(child);
        if(child instanceof VNode){
            child.el=childEl;
        }
        el.appendChild(childEl);
    })
    vnode.el=el;
    return el;
}


export default updateComponent;