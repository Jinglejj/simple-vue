import {isString} from "@/utils";
import listDiff from '@/utils/list-diff'
import patch from "./patch";

function diff(oldTree, newTree) {
    const index = 0; //当前节点的标志
    const patches = {}; //记录每个节点差异的对象
    dfs(oldTree, newTree, index, patches);
    return patches;
}

function dfs(oldNode, newNode, index, patches) {
    //当前的patch
    const currentPatch = [];
    //对比两个节点将不同的值记录下来
    if (newNode === null) {
        //节点被删除
    } else if (isString(oldNode) && isString(newNode)) {
        //文本内容被替换
        if (newNode !== oldNode) {
            currentPatch.push({type: patch.TEXT, content: newNode});
        }
    } else if (oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
        //两个节点名和key值相等
        const propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({type: patch.PROPS, props: propsPatches});
        }
        if (!isIgnoreChildren(newNode)) {
            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
        }
    } else {
        currentPatch.push({type: patch.REPLACE, node: newNode});
    }

    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    let diffs=listDiff(oldChildren,newChildren);
    newChildren=diffs.children;
    if(diffs.moves.length){
        const reorderPatch={type:patch.REORDER,moves:diffs.moves};
        currentPatch.push(reorderPatch);
    }

    let leftNode = null;
    let currentNodeIndex = index;
    oldChildren.forEach((child, i) => {
        const newChild = newChildren[i];
        // 深度优先遍历
        currentNodeIndex =
            leftNode && leftNode.count
                ? currentNodeIndex + leftNode.count + 1
                : currentNodeIndex + 1;
        dfs(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });
}


function diffProps(oldNode, newNode) {
    // 不同prop的数量
    let count=0;
    const oldProps=oldNode.props;
    const newProps=newNode.props;

    let key,value;
    let propsPatches={};

    // 寻找值不同的prop
    for(key in oldProps){
        value=oldProps[key];
        if(newProps[key]!==value){
            count++;
            propsPatches[key]=newProps[key];
        }
    }

    //寻找oldNode中没有的prop
    for(key in newProps){
        value=newProps[key];
        if(!oldProps.hasOwnProperty(key)){
            count++;
            propsPatches[key]=newProps[key];
        }
    }

    if(count===0){
        return null;
    }
    return propsPatches;
}

function isIgnoreChildren(node) {
    return node.props && node.props.hasOwnProperty('ignore')
}

export default diff;
