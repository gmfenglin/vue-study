const _debouce = (fn, t) => {
    let delay = t || 300;
    let timer;
    return function () {
        let args = arguments;
        let that = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(that, args);
        }, delay);
    };
};
const _throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 300;

    return function () {
        let args = arguments;
        let now = + new Date();
        let that = this;
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(that.args);
            }, interval);
        } else {
            last = now;
            fn.apply(that, args);
        }
    };
}
export { _debouce, _throttle };