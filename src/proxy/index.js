export const proxy = (target, sourceKey) => {
    Object.keys(target[sourceKey]).forEach((key) =>
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get() {
                return target[sourceKey][key];
            },
            set(val) {
                target[sourceKey][key] = val;
            },
        })
    );
}
