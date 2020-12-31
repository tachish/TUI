export default function useDebounce(fn, wait) {
    let timer = null
    return function(...args) {
        let context = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(context, wait)
        }, wait)
    }
}