const nav = document.querySelector(".div-ul");
const btn = document.querySelector("#nav-btn");
btn.addEventListener("click", async () => {
  if (nav.classList.contains("visible")) {
    await nav.classList.add("closing");
    await nav.classList.remove("visible");
    nav.addEventListener(
      "animationend",
      () => {
        nav.classList.remove("closing");
        nav.classList.add("closed");
      },
      { once: true }
    );
  } else {
    nav.classList.add("visible");
    nav.classList.remove("closed");
  }
});

const navlinks = document.querySelectorAll('.navlink')

navlinks.forEach(navlink=>{
    navlink.addEventListener('click',(e)=>{
        navlinks.forEach(link=>{
            link.removeAttribute('active');
        })
        e.target.setAttribute('active','')
    })
})