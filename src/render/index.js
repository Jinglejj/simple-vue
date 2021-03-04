import { compile } from "@/compile";
import VNode from "@/VNode/VNode.js";

function render() {
  const vm=this;
  const { _template } = vm;
  const vnode = generateVNode(_template, vm);
  return vnode;
}

/**
 * 通过递归将DOM转换为virtual-dom
 * @param {} node
 * @param {*} vm
 */
export function generateVNode(node, vm) {
  const { childNodes } = node;
  const childVNodeList = [];
  for (let child of childNodes) {
    const childVNode = generateVNode(child, vm);
    childVNode && childVNodeList.push(childVNode);
  }
  const vnode = compile(node, vm);
  if (vnode instanceof VNode) {
    vnode.addChildren(childVNodeList);
  }
  return vnode;
}

export default render;
