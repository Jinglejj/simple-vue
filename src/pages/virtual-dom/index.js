import VNode from '@/VNode/VNode.js';
import diff from '@/VNode/diff.js';
import patch from '@/VNode/patch.js';


var tree = new VNode('div', {'id': 'container'}, [
    new VNode('h1', {style: 'color: blue'}, ['simple virtal dom']),
    new VNode('p', ['Hello, virtual-dom']),
    new VNode('ul', ['dsadas',new VNode('li',['123132'])])
])

var root = tree.render()
document.body.appendChild(root)

var newTree = new VNode('div', {'id': 'container'}, [
    new VNode('h1', {style: 'color: red'}, ['simple virtal dom']),
    new VNode('p', ['Hello, virtual-dom']),
    new VNode('ul', [new VNode('li'), new VNode('li')])
])


var patches = diff(tree, newTree)

setTimeout(()=>{
    patch(root, patches)
},3000)



