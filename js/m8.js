let noLogin = document.getElementById('noLogin');
let close = noLogin.getElementsByTagName('a')[1];
close.onclick = function () {
    noLogin.parentNode.removeChild(noLogin);
};
let m8H = document.getElementById('m8_img');
window.onscroll = function () {
    let winH = document.documentElement.scrollTop;
    console.log(winH);
    if (winH > 210) {
        $('.m8Name').css('position', 'fixed').css('left', '0').css('top', '0')
    } else {
        $('.m8Name').css('position', 'sticky')
    }
    if (winH > 230 && winH < 800) {
        // m8H.style.position ='fixed';
        $('.m8_img').css('position', 'fixed').css('left', '63px').css('top', '50px')
    } else if (winH < 800) {
        m8H.style.position = '';
    } else {
        m8H.style.position = 'sticky';
    }
};



