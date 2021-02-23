import Dep from './Dep'
export function observer (obj) {
  if (!obj || typeof obj !== "object") {
    return;
  }
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}


export function defineReactive(obj,key,val){
    observer(val);
    var dep=new Dep();
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get(){
            if(Dep.target){Dep.target.addDep(dep)}
            return val;
        },
        set(newVal){
            if(newVal===val) return;
            val=newVal;
            dep.notify();
        }
    })
}

export default observer;