
let $item = $('.nav-items');
let $hemenu = $('.header-menu');
for (let i = 0; i < $item.length; i++) {
    $item[i].index = i;
    $item.mouseenter(function () {
        $hemenu.css("display","block");
    });
    $hemenu.mouseenter(function () {
        $hemenu.css("display","block");
    });
    $item.mouseleave(function () {
        $hemenu.css("display","none");
    });
    $hemenu.mouseleave(function () {
        $hemenu.css("display","none");
    });
}

let $inputs = $('.search-text');
let $Inputs= $('.search-btn');
let $sHot = $('.search-hot');
let $sBot = $('.search-bot');
$inputs.click(function () {
    $inputs.css("border-color","#ff6700");
    $Inputs.css("border-color","#ff6700");
    $sBot.css("display","block");
    $sHot.css("display","none");
});
$inputs.blur(function () {
    $inputs.css("border-color","#e0e0e0");
    $Inputs.css("border-color","#e0e0e0");
    $sBot.css("display","none");
    $sHot.css("display","block");
});

let $outer=$('.first-bot');
let $swiper=$('.ui-viewport');
let $focus=$('.ui-icons');
let $left=$('.left');
let $right=$('.right');
let step=0;
let timer=null;
let data={
        "snow":[
            {"img":"./img/index1.jpg"},
            {"img":"./img/index2.jpg"},
            {"img":"./img/index3.jpg"}
        ],
        "cer":[
            {"img":"./img/index1.jpg"},
            {"img":"./img/index2.jpg"},
            {"img":"./img/index3.jpg"}
        ]
    }
;

//请求数据
// $.ajax({
//     url:'js/tsconfig.json',
//     method:'get',
//     async:false,
//     dataType:'json',
//     success:function (n) {
//         data=n;
//         bindHtml()
//     }
// });
bindHtml()
function bindHtml() {
    var imgStr=``,lisStr=``;
    $.each(data.snow,function (index,item) {
        imgStr+=`<img data-src="${this.img}" alt="">`;
        lisStr+=`<li class="${index==0?'selected':''}"></li>`
    })
    $swiper.html(imgStr);
    $focus.html(lisStr);
    lazyImg()
}

function lazyImg() {
    $('.ui-viewport img').each(function (index) {
        let  that=this;
        let newImg=new Image();
        let  url=$(this).attr('data-src');
        newImg.src=url;
        $(newImg).load(function () {
            $(that).attr('src',this.src);
            newImg=null;
            index===0?$(that).fadeIn(500):null;
        })
    })
}
timer=setInterval(autoMove,2000);
function autoMove() {
    step++;
    if (step>=data.length){
        step=0;

    }
    $('.ui-viewport img').eq(step).fadeIn(1000).siblings().fadeOut();
    $('.ui-icons li').eq(step).addClass('selected').siblings().removeClass('selected')
}
$('.first-bot').hover(function () {
    clearInterval(timer);
    $('#outer.left,#outer.right').fadeIn();
},function () {
    timer=setInterval(autoMove,2000)
    $('#outer.left,#outer.right').fadeOut();
});
$right.click(function () {
    autoMove()
});
$left.click(function () {
    step-=2;
    if (step<=-1){
        step=data.length-2
    }
    autoMove()
})
$('.ui-icons li').hover(function () {
    step=$(this).index()-1;
    autoMove()
})

// (function () {
//     let outer=document.getElementById('outer1');
//     let swiper=document.getElementsByClassName('iMage');
//     let focus=document.getElementsByClassName('focus1');
//     let left=focus.getElementsByTagName('button')[0];
//     let right=focus.getElementsByTagName('button')[1];
//     let imgs=swiper.getElementsByTagName('img');
//     let lis=focus.getElementsByTagName('li');
//     let data=null;
//     let step=0;
//     let timer=null;
//     let isClick=true;
// //通过ajax获取数据
//     var xhr=new XMLHttpRequest();
//     xhr.open('get','JSON/tsconfig.json',false);
//     xhr.onreadystatechange=function () {
//         if (xhr.readyState==4&&xhr.status==200){
//             data=JSON.parse(xhr.responseText);
//         }
//     }
//     xhr.send();
// //绑定数据
//     function bindHTml() {
//         var imgStr=``,lisStr=``;
//         for (var i = 0; i < data.length; i++) {
//             imgStr+=`<div><img data-src="img/${data[i].src}" alt=""></div>`;
//             lisStr+=`<li class="${i===0?'selected':''}"></li>`;
//
//         }
//         imgStr+=`<div><img data-src="img/${data[0].src}" alt="">`;
//         swiper.innerHTML=imgStr;
//         focus.innerHTML=lisStr;
//         utils.css(swiper,'width',1000*(data.length+1));
//
//     }
//     bindHTml();
//
// //延迟加载
//     function lazyImg() {
//         for (let i = 0; i < imgs.length; i++) {
//             let cur=imgs[i];
//             let newImg=new Image();
//             let url=cur.getAttribute('data-src');
//             newImg.src=url;
//             newImg.onload=function () {
//                 cur.src=this.src;
//                 newImg=null;
//                 animate(cur,{opacity:1},1000)
//             }
//
//         }
//     }
//
//     lazyImg();
// //轮播
//     timer=setInterval(autoMove,2000);
//     function autoMove() {
//         if (step>=data.length){
//             step=0;
//             utils.css(swiper,'left',0)
//         }
//         step++;
//         //animate中设置的动画时间必须必setInterval中的间隔时间小
//         animate(swiper,{left:step*-1000},1000,function () {
//             isClick=true
//         });
//         focusTip();
//     }
//
//     function focusTip() {
//         for (var i = 0; i < lis.length; i++) {
//             if (step===i){
//                 lis[i].classList.add('selected');
//             }else {
//                 lis[i].classList.remove('selected')
//             }
//             if (step===data.length){
//                 lis[0].classList.add('selected');
//             }
//
//         }
//     }
// //滑入停止滑出继续
//     outer.onmouseover=function () {
//         clearInterval(timer);
//         utils.css(left,'display','block')
//         utils.css(right,'display','block')
//     };
//     outer.onmouseout=function(){
//         timer=setInterval(autoMove,2000);
//         utils.css(left,'display','none');
//         utils.css(right,'display','none');
//     };
//     right.onclick=function () {
//         if (isClick){
//             isClick=false;
//             autoMove();
//         }
//
//     };
//     left.onclick=function () {
//         if (isClick){
//             isClick=false;
//             if (step<=0){
//                 step=data.length;
//                 utils.css(swiper,'left',step*-1000)
//             }
//             step--;
//             animate(swiper,{left:-1000*step},1000,function () {
//                 isClick=true;
//             });
//             focusTip()
//         }
//
//     };
// //点击小圆点
//     for (let i = 0; i < lis.length; i++) {
//         lis[i].onclick=function(){
//             if (isClick){
//                 isClick=false;
//                 step=i-1;
//                 autoMove();
//             }
//
//         }}
//
//     PLAY()
//
// })();
