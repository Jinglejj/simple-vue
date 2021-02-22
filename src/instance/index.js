import observer from "@/observer";
import { compile } from "@/compile";
import { proxy } from "@/proxy";
import VNode from "@/VNode/VNode";
import render from '@/render'
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;
    this.el = options.el;
    observer(this._data);
    proxy(this, "_data");
    if (options.el) {
      this.$mount(options.el);
    }
  }

  $mount(el) {
    el = el || this.el;
    const container = document.querySelector(el);
    const dom=nodeToFragment(container);
    const vnode = nodeToVNode(dom.firstElementChild, this);
    console.log(vnode);
    const app=render(vnode);
    console.log(app);
    document.body.appendChild(app);
  }
}

function nodeToFragment(node){
  const flag = document.createDocumentFragment();
  flag.appendChild(node);
  return flag;
}


function nodeToVNode(node, vm) {
  const { childNodes } = node;
  const childVNodeList = [];
  for (let child of childNodes) {
    const childVNode = nodeToVNode(child, vm);
    childVNode&&childVNodeList.push(childVNode);
  }
  const vnode = compile(node, vm);
  if(vnode instanceof VNode){
    vnode.addChildren(childVNodeList);
  }
  return vnode;
}

export default Vue;
