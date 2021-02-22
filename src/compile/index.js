import Watcher from "../observer/Watcher";
import VNode from "@/VNode/VNode.js";
import { getObjValueByString } from "../utils";
export const compile = (node, vm) => {
  const reg = /[^{}]+(?=})/g;
  let vnode = null;
  if (node.nodeType === 1) {
    const attr = node.attributes;
    const name = node.localName;
    let props={};
    for (let i = 0; i < attr.length; i++) {
      props[attr[i].nodeName]=attr[i].nodeValue;
    }
    vnode = new VNode(name, props,[],vm);
  }

  if (node.nodeType === 3 && node.nodeValue.trim()) {
    vnode = node.nodeValue.trim();
    const arr = node.nodeValue.match(reg);
    node.nodeValue =
      arr &&
      new Watcher(vm, node, arr) &&
      arr.map((e) => getObjValueByString(vm, e)).join(" ");
  }

  return vnode;
};
