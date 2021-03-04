import { isString } from "@/utils";
import {generateElment} from '@/update'
const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;

function patch(node, patches) {
  const walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  const currentPatches = patches[walker.index];
  const len = (node.childNodes && node.childNodes.length) || 0;
  for (let i = 0; i < len; i++) {
    const child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  // 如果当前节点存在差异
  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

function applyPatches(node, currentPatches) {
  currentPatches.forEach((currentPatch) => {
    switch (currentPatch.type) {
      case REPLACE:
        const newNode = isString(currentPatch.node)
          ? document.createTextNode(currentPatch.node)
          : generateElment(currentPatch.node);
        node.parentNode.replaceChild(newNode, node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          node.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error(`Unknown patch type ${currentPatch.type}`);
    }
  });
}

function setProps(node, props) {
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, value);
    }
  }
}

function reorderChildren(node, moves) {
  const staticNodeList = Array.from(node.childNodes);
  let maps = {};

  staticNodeList.forEach((node) => {
    if (node.nodeType === 1) {
      var key = node.getAttribute("key");
      if (key) {
        maps[key] = node;
      }
    }
  });

  moves.forEach((move) => {
    let index = move.index;
    if (move.type === 0) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        // maybe have been removed for inserting
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      // insert item
      const insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true) // reuse old item
        : typeof move.item === "object"
        ? move.item.render()
        : document.createTextNode(move.item);
      staticNodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

export default patch;
