import Dep from './Dep'
function observer (obj) {
  if (!obj || typeof obj !== "object") {
    return;
  }
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}


function defineReactive(obj,key,val){
    observer(val);
    var dep=new Dep();
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get(){
            if(Dep.target){dep.addSub(Dep.target);}
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