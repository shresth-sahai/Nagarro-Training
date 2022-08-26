const left=document.querySelector('.prev');
const right=document.querySelector('.next');
const images=document.querySelector('.carousal').children;
let slide_index = 0;
left.addEventListener('click',()=> move(slide_index-1));
right.addEventListener('click',()=> move(slide_index+1));

function move(idx) {
    if(idx<0) slide_index=images.length-1;
    else if(idx>=images.length)slide_index=0;
    else slide_index=idx;

    for(let i=0;i<images.length;i++) {
        images[i].style.display = "none";
    }
    images[slide_index].style.display="block";
    images[slide_index].classList.add('fade');
}
