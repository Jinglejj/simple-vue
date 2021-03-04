import Vue from '@/instance';

let vm=new Vue({
    data:{
        text:'Hello World',
        obj:{name:'于锦江'}
    },
    methods:{
        reverseText(){
            console.log(this);
            this.text=this.text.split('').reverse().join('');
        }
    }
})

vm.$mount("#app"); 
document.getElementById('button').addEventListener('click',()=>{vm.reverseText()})