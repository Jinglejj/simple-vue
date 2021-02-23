import nextTick from'./next-tick';
let has = {};
let queue = [];
let waiting = false;

export default function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id]==null) {
        has[id] = true;
        queue.push(watcher);
        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}

function flushSchedulerQueue () {
    let watcher, id;

    for (let index = 0; index < queue.length; index++) {
        watcher = queue[index];
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }

    waiting  = false;
}

