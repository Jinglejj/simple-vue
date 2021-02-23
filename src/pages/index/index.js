import Vue from '@/instance';

let vm=new Vue({
    data:{
        text:'Hello World',
        obj:{name:'于锦江'}
    }
})
vm.$mount("#app"); 


setTimeout(()=>{
    vm.obj.name="12132131"
},2000)