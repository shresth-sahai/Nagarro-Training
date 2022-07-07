let btn=document.querySelector('button');
btn.addEventListener('click',fn);

function fn()
{
  let name=prompt('Are you Sure?');
  //btn.textContent= name;
  window.location.href = "Pokemon_Images.html";
}