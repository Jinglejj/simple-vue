import {observer} from '@/observer'
import {hasOwn} from '@/utils'
export function initState(vm) {
  const options = vm.$options;
  if (options.methods) initMethods(vm, options.methods);
  if (options.data) initData(vm);
}

function initData(vm) {
  let {methods,data}=vm.$options;
  // 如果data是个函数的话获取data函数的返回值，否则直接返回data本身或空对象
  data = vm._data = typeof data === "function" ? data() : data || {};
  const keys=Object.keys(data);
  for(let key of keys){
      // 判断该属性是否在methods中存在
      if(methods&&hasOwn(methods,key)){
          console.warn(`Method "${key}" has already been defined as a data property.`);
      }else {
          proxy(vm,`_data`,key);
      }
  }
  observer(data)
}


/**
 * 代理对象，可以直接通过vm.name对vm._data.name进行访问
 * @param {} target 
 * @param {*} sourceKey 
 * @param {*} key 
 */
export function proxy (target, sourceKey, key) {
    Object.defineProperty(target, key, {
        get(){
            return this[sourceKey][key];
        },
        set(val){
            this[sourceKey][key] = val;
        }
    })
  }

function initMethods(vm, methods) {}