(function () {
    let utils = (function () {
            function getCss(ele,attr){
                let value = window.getComputedStyle(ele)[attr];
                // 获取到的value 是一个字符串，需要转数字
                // 而且我们需要拿到这个值进行计算，带有单位的值，需要去掉单位
                // ‘12px’ ‘red’  '13'  '0.5'
                var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem|%)?$/i;
                if(reg.test(value)){
                    value =parseFloat(value)
                }
                return value
            }
        function setCss(ele, attr, value) {
            let reg = /^windth|height|font-size|(margin|padding)|(margin|padding)?(left|right|top|bottom)$/i;
            if (reg.test(attr)) {
                /px/.test(value.toString()) ? null : value += 'px';
            }
            ele.style[attr] = value
        }
        function setGroupCss(ele,obj={}) {
            if(Object.prototype.toString.call(obj)==='[object Object]'){
                for (let key  in obj) {
                   if(obj.hasOwnProperty(key)){
                   setCss(ele,key,obj[key])
                    }
                }
             }
        }
        function css(...arg) {
           if(arg.length===3){
                     setCss(...arg)
            } else if(arg.length===2){
               // if(arg[1] instanceof Object){
                   if(typeof arg[1] ==='object'){

                    setGroupCss(...arg)
                }else{
                 return  getCss(...arg)
               }
           }
        }
        return {css}
    })()
    //匀速直线运动
    let linear =function (time,duration,change,begin) {
           return  time/duration*change+begin
    };
    window.animate =function (ele,target={},duration,callback) {
        if(typeof duration ==='function'){
             callback =duration;
             duration =2000;
         }
         let change ={}, time =0,begin={};
        for (let key in target) {
             begin[key] =utils.css(ele,key);
             change[key] = target[key] - begin[key];
        }
        clearInterval(ele.timer);
        ele.timer = setInterval(()=>{
            time+=17;
            if(time>=duration){
               clearInterval(ele.timer);
               utils.css(ele,target);
                if(typeof callback==='function'){
                    callback&&callback.call(ele);
                }
               return
             }
            for (let key in change) {
                let cur =linear(time,duration,change[key],begin[key]);
                utils.css(ele,key,cur)
            }
        },17)
    }
    window.utils =utils;
    window.animate=animate;
})();