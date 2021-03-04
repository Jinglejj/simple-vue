import Vue from '@/instance';
import {generateVNode} from '@/render'
import diff from '@/VNode/diff.js'
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
document.getElementById('button').addEventListener('click',()=>{
    const el=document.getElementById('show-name');
    console.log(el);
    const app=document.getElementById('app');
    app.removeChild(el)
    const vnode=vm._vnode;
    const newVnode=generateVNode(app);
    console.log(newVnode);
    console.log(vnode);
    console.log(diff(vnode,newVnode));

})