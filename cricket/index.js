const render = document.querySelector('#render');
console.log(render);
const url = "https://api.cricapi.com/v1/currentMatches?apikey=c98cc071-432a-44a9-9aac-78e6d084ebdb&offset=0";
const btn = document.querySelector('.mybtn');
let loading = false;
btn.addEventListener('click', () => {
    render.innerHTML = `<h5 class="text-center my-2" style="width:100%">Loading...</h5>`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const match = data.data;
            if (!match) return;
            render.innerHTML = '';
            match.forEach(item => {
                console.log(item);
                render.innerHTML += `<div class="col-sm-12 col-md-6">
<div class="card mx-auto rounded my-4">
    <div class="card-header text-white">${item.name}</div>
    <div class="card-body">
        <div class="row">
            <div class="col-6">
                <div class="d-flex justify-content-start align-items-center">
                    <img src=${item.teamInfo[0].img} class="card-img-top img" alt="team">
                    <span>${item.teamInfo[0].shortname}</span>
                </div>
                    <p>Runs : ${item.score[0].r}</p>
                    <p>Wickets : ${item.score[0].w}</p>
                    <p>Over : ${item.score[0].o}</p>
            </div>
            <div class="col-6">
                <div class="d-flex justify-content-start align-items-center">
                    <img src=${item.teamInfo[1].img} class="card-img-top img" alt="team">
                    <span>${item.teamInfo[1].shortname}</span>
                </div>
                <p>Runs : ${item.score[0].r}</p>
                <p>Wickets : ${item.score[0].w}</p>
                <p>Over : ${item.score[0].o}</p>
            </div>
            </div>
            <p class="py-2 my-2 status" >${item.status}</p>
    </div>
</div>
</div>`
            });
        })
})

