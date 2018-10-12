var J_proHeader = document.getElementById('J_proHeader');
var imgleft = document.getElementById('imgleft');
var imgright = document.getElementById('imgright');
var steplistone=document.getElementById('steplistone');
var btnbridge=steplistone.getElementsByTagName('li');

var steplisttwo=document.getElementById('step-listtwo');

var btnbiglarge=steplisttwo.getElementsByTagName('li');


var imgLeft=document.getElementById('imgleft');
var images=imgLeft.getElementsByTagName('img');

var licontent=document.getElementById('licontent');
 var lispan=licontent.getElementsByTagName('span');

 var totlePrice=document.getElementById('totlePrice');

 var yiyue=document.getElementById('yiyue');

//console.log(images);

// console.log(btnbridge);
window.onscroll = function () {
    let TwinScroll = utils.win('scrollTop');
    let TwinOff = J_proHeader.offsetTop;
    let ImgOffL = imgleft.offsetTop;
    let ImgOffR = imgright.offsetTop;


    if (TwinScroll > TwinOff && TwinScroll <= 1432) {

        J_proHeader.style.position = 'fixed'
        J_proHeader.style.top = 0 + 'px'
        J_proHeader.style.zIndex = 1;

    }

    if (ImgOffL < TwinScroll && TwinScroll <= 800) {
        imgleft.style.position = 'fixed';
        imgleft.style.top = 130 + 'px';

    } else if (TwinScroll > 800) {


        imgleft.style.position = 'absolute';
        imgleft.style.top = 670 + 'px'
        imgleft.style.zIndex = -1;
    }

}

function visonChoose() {
    for (var i = 0; i <btnbridge.length ; i++) {

        btnbridge[i].onclick = function () {
            for (var j = 0; j <btnbridge.length ; j++) {
                btnbridge[j].className='btn-bridge';
            }
            this.className='active';

          return this;
        }

    }

}
visonChoose();


function colorChoose() {

    for (var i = 0; i < btnbiglarge.length; i++) {
        btnbiglarge[i].index=i;

        btnbiglarge[i].onclick=function () {

            for (var j = 0; j <btnbiglarge.length ; j++) {

                btnbiglarge[j].className='btn-biglarge';
                images[j].className='active3';

            }

            this.className='active2';

            images[this.index].className='active4';
            return this;
        }

    }

}

colorChoose();


function priceCount() {

   if (yiyue.checked){

       console.log(1);
   }

}
priceCount();
