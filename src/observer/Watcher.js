import Dep from "./Dep";
import {getObjValueByString} from '@/utils'
export default class Watcher {
  constructor(vm, node, name) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.update();
    Dep.target = null;
  }

  get() {
    if(this.node.nodeType===3) {
      this.value = this.name.map(e => getObjValueByString(this.vm, e)).join(' ');
    }else{
      this.value = getObjValueByString(this.vm,this.name);
    }
  }

  update() {
    this.get();
    this.node.nodeValue = this.value;
  }
}
