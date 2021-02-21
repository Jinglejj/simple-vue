import Watcher from "../observer/Watcher";
import {getObjValueByString} from '../utils'
export const compile = (node, vm) => {
  const reg = /[^{}]+(?=})/g;

  if (node.nodeType === 1) {
    const attr = node.attributes;
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].nodeName === "v-model") {
        const name = attr[i].nodeValue;
        node.addEventListener("input", (e) => {
          vm[name] = e.target.value;
        });
        node.value = vm[name];
        node.removeAttribute("v-model");
      }
    }
  }

  if (node.nodeType === 3&&node.nodeValue.trim()) {
    const arr=node.nodeValue.match(reg);
    node.nodeValue=arr.map(e=>getObjValueByString(vm,e)).join(' ');
    new Watcher(vm, node, arr);
  }
};
