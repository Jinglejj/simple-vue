import VNode,{createTextVNode} from "@/VNode/VNode.js";
import { getObjValueByString } from "@/utils";
const reg = /[^{}]+(?=})/g;
const replace = /{{(.+?)}}/g;

export const compile = (node, vm) => {
  let vnode = null;
  if (node.nodeType === Node.ELEMENT_NODE) {
    const attr = node.attributes;
    const name = node.localName;
    let props = {};
    for (let i = 0; i < attr.length; i++) {
      props[attr[i].nodeName] = attr[i].nodeValue;
    }
    vnode = new VNode(name, props, [], vm);
  }

  if (node.nodeType === Node.TEXT_NODE) {
    vnode=node.nodeValue;
    const arr=vnode.match(reg);
    if(arr){
      let values={};
      arr.forEach(name => {
        values[name]=getObjValueByString(vm,name);
      });
      vnode=vnode.replace(replace, (_,g1) => values[g1]);
    }
  }

  return vnode;
};


/**
 * 劫持DOM节点 返回 DocumentFragment
 * @param {} node 
 */
export const nodeToFragment = (node) => {
  const flag = document.createDocumentFragment();
  flag.appendChild(node);
  return flag;
};