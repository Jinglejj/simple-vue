import { compile } from "@/compile";
import VNode from './VNode';

/**
 * 劫持DOM节点 返回 DocumentFragment
 * @param {} node 
 */
export const nodeToFragment = (node) => {
  const flag = document.createDocumentFragment();
  flag.appendChild(node);
  return flag;
};



/**
 * 通过递归将DOM转换为virtual-dom
 * @param {} node 
 * @param {*} vm 
 */
export const nodeToVNode = (node, vm) => {
  const { childNodes } = node;
  const childVNodeList = [];
  for (let child of childNodes) {
    const childVNode = nodeToVNode(child, vm);
    childVNode && childVNodeList.push(childVNode);
  }
  const vnode = compile(node, vm);
  if (vnode instanceof VNode) {
    vnode.addChildren(childVNodeList);
  }
  return vnode;
};
