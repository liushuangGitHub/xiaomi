
let box=document.getElementById('Login');
let lis=box.getElementsByTagName('li');
let div=box.getElementsByClassName('cc');
console.log(div);
for(let i=0;i<lis.length;i++){
    lis[i].index=i;
    lis[i].onclick=function(){
        for(let j=0;j<lis.length;j++){
            lis[j].className="";
            div[j].className="";
        }
        this.className="active";
        div[this.index].className="active";
    }
}