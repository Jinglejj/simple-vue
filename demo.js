const vm={
        text:'Hello World',
        obj:{name:'于锦江'}
}

const getObjValueByString = (obj, str) => {
    return str.split('.').reduce((prev, next) => prev[next], obj);
}

const reg = /[^{}]+(?=})/g;
const str="{{obj.name}} 秒后切换VirtualDOM"
const arr = str.match(reg);
let values={};
arr&&arr.forEach(e=>values[e]=getObjValueByString(vm,e))
const nodeValue=str.replace(/{{(.+?)}}/g, (_,g1) => values[g1] || g1);
console.log(nodeValue)