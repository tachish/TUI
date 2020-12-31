export default function useThrottle(fn, delay) {
    let flag = true
    let timer = null
    return function(...args) {
        let context = this
        if(!flag) return
        flag = false
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(context, args)
            flag = true
        }, delay)
    }
}