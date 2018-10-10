var comFunction = (function () {
    // 轮播图
    function loop() {
        // 1.获取元素
        let $banner_main = $('#banner_main');
        let $swiper = $('.swiper');
        let $focus = $('.focus');
        let $left = $('.left');
        let $right = $('.right');
        let step = 0;
        let timer = null;
        let data = null;

        // 2.请求数据
        $.ajax({
            url: 'json/community.json',// 请求地址
            method: 'get', // 请求方式
            async: false, // 是否异步
            dataType: 'json', // 要求返回数据格式
            success: function (n) { // 成功执行方法
                data = n;
                bindHtml();
            }
        });

        // 3.绑定数据
        function bindHtml() {
            var imgStr = ``, liStr = ``;
            $.each(data.loop, function (index, item) {
                // console.log(this.img);
                imgStr += `<img data-src="img/${this.img}" alt="">`;
                liStr += `<li class="${index == 0 ? 'selected' : ''}">${index + 1}</li>`
            });
            $swiper.html(imgStr);
            $focus.html(liStr);
            lazyImg()
        }

        // 4.延迟加载
        function lazyImg() {
            $('.swiper img').each(function (index) {
                let that = this
                let newImg = new Image();
                let url = $(this).attr('data-src')
                newImg.src = url;
                $(newImg).load(function () {
                    $(that).attr('src', this.src);
                    newImg = null;
                    index === 0 ? $(that).fadeIn(500) : null;
                })
            })
        }

        timer = setInterval(autoMove, 2000);

        function autoMove() {
            step++;
            if (step >= data.loop.length) {
                step = 0
            }
            // console.log(step);
            $('.swiper img').eq(step).fadeIn(500).siblings().fadeOut();
            $('.focus li').eq(step).addClass('selected').siblings().removeClass('selected');
        }

        $('.banner_main').hover(function () {
            clearInterval(timer);
            $('#banner_main .left,#banner_main .right').fadeIn()
        }, function () {
            timer = setInterval(autoMove, 2000);
            $('#banner_main .left,#banner_main .right').fadeOut()
        });

        $right.click(function () {
            autoMove()
        });
        $left.click(function () {
            step -= 2;
            if (step < -1) {
                step = data.loop.length - 2
            }
            autoMove()
        });
        $('.focus li').hover(function () {
            step = $(this).index() - 1;
            autoMove()
        });
    }

    // 选项卡
    function tab() {
        // 获取元素
        let title = document.getElementById('title');
        // let title = plate.getElementById('title')
        let lis = title.getElementsByTagName('li');
        let divs = plate.getElementsByTagName('div');

        // 给每一个选项卡添加点击事件，利用for循环添加
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
            lis[i].onmouseover = function () {
                for (var j = 0; j < lis.length; j++) {
                    lis[j].classList.remove('active');
                    divs[j].classList.remove('active');
                }
                this.classList.add('active');
                divs[this.index].classList.add('active');
            }
        }
    }

    // 分页
    function paging() {
        // 1.获取元素
        let middle_new = document.getElementById('middle_new');
        let uls = middle_new.getElementsByTagName('ul');
        uls = utils.toArray(uls);
        let data = null;
        let currentPage = 0; // 当前页
        let pageSize = 10; // 每页显示行数
        let num = 0; // 数据总行数
        let totalPage = 0;  // 总页数
        let pList = pages.getElementsByTagName('a');
        var pageStr = ``;
        // 2.请求数据
        $.ajax({
            url: 'json/community.json',// 请求地址
            method: 'get', // 请求方式
            async: false, // 是否异步
            dataType: 'json', // 要求返回数据格式
            success: function (n) { // 成功执行方法
                data = n.news;
                // console.log(data);
                bindHtml();
            }
        });

        // 3.绑定数据
        function bindHtml() {
            $.each(data, function (index, item) {
                uls[0].innerHTML += `<li>
                <h2><a href="###">${data[index].title}</a></h2>
                <p class="top clear">
                    <a href="###">${data[index].types}</a>| ${data[index].upDate}
                    <span>
                            <i>${data[index].browser}</i>
                            <a href="###" >
                                <i class="comment">${data[index].message}</i>
                            </a>
                            <a href="###" >
                                <i class="share">分享</i>
                            </a>
                        </span>
                </p>
                <img src="img/${data[index].img}" alt="">
                <p class="abstract">${data[index].sketch}
                    <a href="###" class="all">全文》</a>
                </p>
            </li>`
            });
            pagination(currentPage);
        }

        // 4.分页
        function pagination(pno) {
            num = data.length;
            if (num / pageSize > parseInt(num / pageSize)) {
                totalPage = parseInt(num / pageSize) + 1;
            } else {
                totalPage = parseInt(num / pageSize);
            }
            currentPage = totalPage > 0 && currentPage == 0 ? 1 : pno; //当前页数
            var startRow = (currentPage - 1) * pageSize + 1; //开始显示的行
            var endRow = currentPage * pageSize; //结束显示的行
            endRow = (endRow > num) ? num : endRow;
            let lis = uls[0].getElementsByTagName('li')
            // 遍历显示数据显示当前选中页面的数据，其余数据隐藏
            for (var i = 1; i < (num + 1); i++) {
                if (i >= startRow && i <= endRow) {
                    lis[i - 1].style.display = 'block';
                } else {
                    lis[i - 1].style.display = 'none';
                }
            }
            for (let i = 0; i < totalPage; i++) {
                pageStr += `<a href="###" class="${currentPage == (i + 1) ? 'now_age' : ''}">${i + 1}</a>`
            }
            // 判断当页数+上一页+下一页 的节点之和 > 当前分页中所有a标签的个数时候进行一次追加html，相当于首次加载的时候加载一次分页
            if ((totalPage + 2) > pList.length) {
                $("#prev_page").after(pageStr);
            } else {
                pageStr = ``;
            }
            var tempStr = "共" + num + "条记录 分" + totalPage + "页 当前第" + currentPage + "页";
            // console.log(tempStr);
            // 如果当前页面 > 1 , 显示上一页
            if (currentPage > 1) {
                // 显示上一页
                prev_page.style.display = 'inline-block';
            } else {
                // 不显示上一页
                prev_page.style.display = 'none';
            }
            // 如果当前页面 < 最大页面（总页面数） , 显示下一页
            if (currentPage < totalPage) {
                next_page.style.display = 'inline-block';
            } else {
                next_page.style.display = 'none';
            }
        }

        btn();
        pagination(currentPage);
        // 上一页
        prev_page.onclick = function () {
            for (let i = 0; i < pList.length; i++) {
                if (pList[i].innerHTML == currentPage) {
                    // console.log(pList[i].innerHTML, "prev_page");
                    pList[i].classList.remove('now_age');
                    break;
                }
            }
            currentPage -= 1;
            pagination(currentPage);
            for (let i = 0; i < pList.length; i++) {
                if (pList[i].innerHTML == currentPage) {
                    // console.log(pList[i].innerHTML, "prev_page");
                    pList[i].classList.add('now_age');
                    break;
                }
            }
        };
        // 下一页
        next_page.onclick = function () {
            for (let i = 0; i < pList.length; i++) {
                if (pList[i].innerHTML == currentPage) {
                    // console.log(pList[i].innerHTML, "next_page");
                    pList[i].classList.remove('now_age');
                    break;
                }
            }
            currentPage += 1;
            pagination(currentPage);
            for (let i = 0; i < pList.length; i++) {
                if (pList[i].innerHTML == currentPage) {
                    // console.log(pList[i].innerHTML, "next_page");
                    pList[i].classList.add('now_age');
                    break;
                }
            }
        };

        // 点击数字页跳转
        function btn() {
            // console.log(pList.length, "pList.length");
            for (let i = 0; i < pList.length; i++) {
                if (Number(pList[i].innerHTML) != NaN) {
                    // console.log(Number(pList[i].innerHTML), 1111);
                    pList[i].onclick = function () {
                        var pList = pages.getElementsByTagName('a');
                        for (let i = 0; i < pList.length; i++) {
                            if (pList[i].innerHTML == currentPage) {
                                pList[i].classList.remove('now_age');
                                break;
                            }
                        }
                        currentPage = Number(pList[i].innerHTML);
                        pagination(Number(pList[i].innerHTML));
                        for (let i = 0; i < pList.length; i++) {
                            if (pList[i].innerHTML == currentPage) {
                                pList[i].classList.add('now_age');
                                break;
                            }
                        }

                    }
                }
            }
        }

    }

    return {
        loop,
        tab,
        paging
    }
})();

