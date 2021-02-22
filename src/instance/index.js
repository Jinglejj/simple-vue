import observer from "@/observer";
import { proxy } from "@/proxy";
import {nodeToFragment} from "@/compile";
import updateComponent from '@/update';
import render from '@/render';
class Vue {
  vnode;
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
    const template=nodeToFragment(container).firstElementChild; //截持dom,并提取模板
    this._template=template;
    const vnode = render(template, this); // 将dom转换为virtual-dom
    const app=updateComponent(vnode);  // 渲染virtual-dom
    console.log(vnode);
    this.vnode=vnode;
    this.el=app;
    document.body.appendChild(app);
  }
}

export default Vue;
