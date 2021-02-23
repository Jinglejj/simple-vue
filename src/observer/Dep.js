let uid = 0;
export default class Dep {
  constructor() {
    this.id = ++uid;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

let stack = [];
export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}
export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}
