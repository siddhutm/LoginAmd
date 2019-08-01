const Debounce = function(fn, delay) {
    var timeOut;
    return function() {
        clearTimeout(timeOut);
        const context = this;
        timeOut = setTimeout(() => {
            fn.apply(context, arguments);
        }, delay)
    }
}

export default Debounce;