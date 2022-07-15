const root = document.getElementById("root");
const getBtn = document.getElementById("get-btn");
const apiKey = "e25d34f3-6b75-4369-bd96-c00454a5bfc2";
const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;
let count=0;
getBtn.addEventListener("click", () => {
  root.innerHTML = `<div class="spinner-border text-light align-self-center" role="status"><span class="visually-hidden">Loading...</span></div>`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const matches = data.data;
      root.innerHTML = `<h1 class="display-4 w-100 text-center mb-3"><span class="text-danger">Live</span> Cricket Score</h1>`;
      for(let i=0;i<matches.length;i++){
        count++;
        const match = matches[i];
        root.innerHTML += `
            <div class="card my-2 border-0 overflow-hidden">
                <span class="small w-100 text-center mb-1 py-2 bg-dark text-white">${match.name}</span>
                <div class="teams d-flex justify-content-between px-3 py-2">
                    <div class="team">
                        <img src="${match.teamInfo[0].img}" alt="${match.teamInfo[0].shortname}" class="team-logo">
                        <span class="small">${match.teamInfo[0].shortname}</span>
                    </div>
                    <div class="team text-end">
                        <span class="small">${match.teamInfo[1].shortname}</span>
                        <img src="${match.teamInfo[1].img}" alt="${match.teamInfo[1].shortname}" class="team-logo">
                    </div>
                </div>
                <div class="score card-body w-100 bg-dark text-white px-5">
                    <div class="team-inning">
                    <p class="innings">${
                        typeof match.score[0] === "undefined"
                          ? ""
                          : match.score[0].inning
                      }</p>
                      <p class="score">${
                        typeof match.score[0] === "undefined"
                          ? ""
                          : match.score[0].r +
                            "/" +
                            match.score[0].w +
                            " (" +
                            match.score[0].o +
                            ")"
                      }</p>
                    </div>
                    <div class="team-inning">
                        <p class="innings">${
                          typeof match.score[1] === "undefined"
                            ? ""
                            : match.score[1].inning
                        }</p>
                        <p class="score">${
                          typeof match.score[1] === "undefined"
                            ? ""
                            : match.score[1].r +
                              "/" +
                              match.score[1].w +
                              " (" +
                              match.score[1].o +
                              ")"
                        }</p>
                    </div>
                </div>
            </div>
            `;
      }
    });
});
