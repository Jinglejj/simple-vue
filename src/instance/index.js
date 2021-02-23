import {observer} from "@/observer";
import { proxy } from "@/proxy";
import { nodeToFragment } from "@/compile";
import {initState} from './state'
import _update from "@/update";
import _render from "@/render";
import Watcher from "../observer/Watcher";
class Vue {
  _vnode = null;
  _watchers = [];
  _render = _render;
  _update = _update;
  constructor(options) {
    this.$options = options;
    initState(this);
    if (options.el) {
      this.$mount(options.el);
    }
  }

  $mount(el) {
    const container = document.querySelector(el); //获取挂载节点
    const template = nodeToFragment(container).firstElementChild; //截持dom,并提取模板
    this._template = template;
    const vm = this;
    let updateComponent = (vm) => {
      vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, () => {}, true);
  }
}

export default Vue;
