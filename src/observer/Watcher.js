import Dep from "./Dep";
import {getObjValueByString} from '@/utils';
import diff from '@/VNode/diff.js';
import patch from '@/VNode/patch.js';
import render from '@/render';
export default class Watcher {
  constructor(vm, vnode, name) {
    Dep.target = this;
    this.name = name;
    this.vnode = vnode;
    this.vm = vm;
    this.get();
    Dep.target = null;
  }

  get() {
      this.value = getObjValueByString(this.vm,this.name);
  }

  update() {
    this.get();
    const oldVNode=this.vm.vnode;
    const newVNode=render(this.vm._template,this.vm);
    const patches=diff(oldVNode,newVNode);
    console.log(newVNode);
    console.log(oldVNode);
    console.log(patches);
    patch(this.vm.el,patches);
  }
}
