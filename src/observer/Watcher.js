import queueWatcher from "@/utils/queue-watcher.js";
import diff from "@/VNode/diff.js";
import patch from "@/VNode/patch.js";
import {pushTarget,popTarget} from './Dep'
import render from "@/render";
let uid = 0;
export default class Watcher {
  newDepIds = new Set();
  newDeps = [];
  deps = [];
  depIds = new Set();
  newDepIds = new Set();
  constructor(vm, exprOrFn, cb, options) {
    this.id = ++uid;
    if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    }
    vm._watcher=this;
    this.vm = vm;
    this.cb = cb;
    this.options = options;
    this.value=this.get();
  }

  get() {
    const vm=this.vm;
    pushTarget(this);
    let value=this.getter.call(vm,vm);
    popTarget();
    return value;
  }

  update() {
    this.get();
    console.log(`watch ${this.id} update`);
    queueWatcher(this);
  }

  run() {
    let oldVNode = this.vm.vnode;
    const newVNode = render(this.vm._template, this.vm);
    const patches = diff(oldVNode, newVNode);
    this.vm.vnode = newVNode;
    oldVNode = null;
    patch(this.vm.el, patches);
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }
}
