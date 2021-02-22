import observer from "@/observer";
import { proxy } from "@/proxy";
import {nodeToFragment,nodeToVNode} from "@/VNode";
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
    const container = document.querySelector(el); //获取挂载节点
    const dom=nodeToFragment(container); //截持dom
    const vnode = nodeToVNode(dom.firstElementChild, this);// 将dom转换为Virtual
    const app=render(vnode);  // 渲染virtual-dom
    document.body.appendChild(app);
  }
}

export default Vue;
