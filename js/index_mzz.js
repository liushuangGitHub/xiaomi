let $map = $('.sowingMap');
let $xmmap = $('.sowingMap-xm');
let $focus = $('.focus');
let $left = $('.sowingMap-L');
let $right = $('.sowingMap-R');
let $meLis = $('.menu-list');
let step = 0;
let timer = null;
let data = {
    "sowing":[
        {"img":"./images/sowing1.jpg"},
        {"img":"./images/sowing2.jpg"},
        {"img":"./images/sowing3.jpg"},
        {"img":"./images/sowing4.jpg"},
        {"img":"./images/sowing5.jpg"}
    ],
    "xuanxiang":[
        {
            "img":"./images/header-L1.png",
            "title":"小米",
            "price":"2699元起"
        },
        {
            "img":"./images/header-L2.png",
            "title":"小米8 SE",
            "price":"1799元起"
        },
        {
            "img":"./images/header-L3.png",
            "title":"小米MIX 3",
            "price":"1699元起"
        },
        {
            "img":"./images/header-L4.png",
            "title":"小米MIX 2S",
            "price":"3299元起"
        },
        {
            "img":"./images/header-L5.png",
            "title":"小米MIX 2",
            "price":"2599元起"
        },
        {
            "img":"./images/header-L6.jpg",
            "title":"小米6X",
            "price":"1399元起"
        }
    ]
};//假数据

let $a = $('a');
let $L = $('.m-left');
let $R = $('.m-right');
let $begin2 = $('.xm-flashPurchase-list2');

let $Lis = $('li');
let $item = $('.nav-item');
let $hemenu = $('.header-menu');

let $times = $('.countdown');

let $inputs = $('.search-text');
let $sHot = $('.search-hot');
let $sBot = $('.search-bot');

let goTop = document.querySelector('.goTop');
let bok = false;
//1：轮播图++++
bindHtml();
function bindHtml() {
    var imgStr = ``,liStr = ``,xuanX = ``,xuanX1 = ``,xuanX2 = ``;
    //轮播图
    $.each(data.sowing,function (index,item) {
        imgStr += `<img src="${this.img}">`;
        liStr += `<li class="${index==0?'selected':''}"></li>`;
    });
    $xmmap.html(imgStr);
    $focus.html(liStr);
    //鼠标滑过显示
    $.each(data.xuanxiang,function (index,item) {
        xuanX += `<li>
                    <div class="figure-thumb">
                        <a href="javascript:;">
                            <img src="${this.img}">
                        </a>
                    </div>
                    <div class="title">
                        <a href="javascript:;">${this.title}</a>
                    </div>
                    <p class="price">${this.price}</p>
                   </li>`;
    });
    $meLis.html(xuanX);
    lazyImg();
}
function lazyImg() {
    $('.sowingMap-xm img').each(function (index) {
        let that = this;
        let newImg = new Image();
        // newImg.src = $(this).attr('data-src');
        $(newImg).load(function () {
            $(that).attr('src',this.src);
            newImg = null;
            index===0?$(that).fadeIn(500):null;
        })
    })
}
timer = setInterval(autoMove,2000);
function autoMove () {
    step++;
    if(step>=data.sowing.length){
        step = 0;
    }
    console.log(step);
    $('.sowingMap-xm img').eq(step).fadeIn(500).siblings().fadeOut();
    $('.focus li').eq(step).addClass('selected').siblings().removeClass('selected');
}
$map.hover(function () {
    clearInterval(timer);
    $('.sowingMap .left,.sowingMap .right').fadeIn();
},function () {
    timer = setInterval(autoMove,2000);
    $('.sowingMap .left,.sowingMap .right').fadeOut();
});
$right.click(function () {
    autoMove();
});
$left.click(function () {
    step-=2;
    if(step<-1){
        step=data.length-2
    }
    autoMove();
});
$('.focus li').click(function () {
    step = $(this).index()-1;
    autoMove();
});
//2：点击左右显示
for (let i = 0; i < $a.length; i++) {
    $a[i].index = i;
    $R.click(function () {
        $begin2.css("display","block");
    });
    $L.click(function () {
        $begin2.css("display","none");
    });
}
//3：鼠标滑过显示
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
//4：倒计时
function lastTime(time) {
    let date = new Date().getTime();
    let targetTime=new Date(time)-date;
    let hour=Math.floor(targetTime%(1000*60*60*24)/(1000*60*60));
    let minute=Math.floor(targetTime%(1000*60*60*24)%(1000*60*60)/(1000*60));
    let second=Math.floor(targetTime%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
    $times.html(`<span>${hour}</span>:<span>${minute}</span>:<span>${second}</span>`);
}
setInterval(function () {
    lastTime('2018-10-13 22:00:00');
},1000);
//5：input框点击
$inputs.click(function () {
    $inputs.css("border-color","#ff6700");
    $sBot.css("display","block");
    $sHot.css("display","none");
});
$inputs.blur(function () {
    $inputs.css("border-color","#e0e0e0");
    $sBot.css("display","none");
    $sHot.css("display","block");
});
//6：回到顶部
function win (key,value) {
    if(value == undefined){
        return document.documentElement[key] || document.body[key]
    }
    document.documentElement[key] = value;
    document.body[key] = value;
}
window.onscroll = function () {
    if(bok){
        clearInterval(goTop.timer);
    }
    bok = true;
    let winScroll = win('scrollTop');
    let winclient = win('clientHeight');
    if(winScroll >= winclient){
        goTop.style.display = 'block';
    }else{
        goTop.style.display = 'none';
    }
};
goTop.onclick = function () {
    let winScroll = win('scrollTop');
    this.timer = setInterval(()=>{
        winScroll -= 150;
        if(winScroll <= 0){
            clearInterval(this.timer);
            win('scrollTop',0);
            return;
        }
        win('scrollTop',winScroll);
        bok = false;
    },17)
};