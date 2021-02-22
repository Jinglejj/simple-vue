import Vue from '@/instance';

const vm=new Vue({
    data:{
        text:'Hello World',
        obj:{name:'于锦江'}
    }
}).$mount("#app")