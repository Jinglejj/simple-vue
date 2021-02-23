let callbaclks=[];
let pending=false;

function nextTick(cb){
    callbaclks.push(cb);
    if(!pending){
        pending=true;
        setTimeout(flushCallbacks,0);
    }
}

function flushCallbacks(){
    pending=false;
    const copies=callbaclks.slice(0);
    callbaclks.length=0;
    for(let i=0;i<copies.length;i++){
        copies[i]();
    }
}

export default nextTick;