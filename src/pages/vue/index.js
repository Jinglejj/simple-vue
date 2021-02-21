import observer from "@/observer";
import {compile} from '@/compile'
import {proxy} from "@/proxy";
class Vue {
  constructor(options) {
    this.$options=options;
    this._data = options.data;
    this.el=options.el;
    observer(this._data);
    proxy(this, "_data");
    if(options.el){
      this.$mount(options.el);
    }
  }

  $mount(el){
    el = el || this.el;
    const container=document.querySelector(el)
    const dom = nodeToFragment(container, this);
    container.appendChild(dom);
  }
}
// 将Vue挂载到window上
window.Vue=Vue;


function nodeToFragment(node, vm) {
  const flag = document.createDocumentFragment();
  let child;
  while (child = node.firstChild) {
      compile(child, vm);
      flag.appendChild(child);
  }
  return flag;
}
