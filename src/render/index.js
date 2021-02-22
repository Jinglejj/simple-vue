import { compile } from "@/compile";
import VNode from "@/VNode/VNode.js";

/**
 * 通过递归将DOM转换为virtual-dom
 * @param {} node
 * @param {*} vm
 */
function render(node, vm) {
  const { childNodes } = node;
  const childVNodeList = [];
  for (let child of childNodes) {
    const childVNode = render(child, vm);
    childVNode && childVNodeList.push(childVNode);
  }
  const vnode = compile(node, vm);
  if (vnode instanceof VNode) {
    vnode.addChildren(childVNodeList);
  }
  return vnode;
}

export default render;
