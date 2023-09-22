$(document).ready(function () {
    $("#click").on("click", function () {
      const movie = $("#movieName").val();
      console.log(movie);
      const url = 'https://www.omdbapi.com/?t=' + movie + '&apikey=c57d2541';
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "False") {
            $("#main").html("<h1>Oops!! Movie not Found</h1>");
          } else {
            $("#main")
              .html(`<div class="card  overflow-hidden " id="mcard"> 
                 <img class="card-img-top" src="${data.Poster}"  alt="Card image cap"   style="height: 300px" />  
                 <div class="card-body" id="info">  
                      <h5 class="card-title text-center" >${data.Title}</h5>
                      <div class="d-flex justify-content-between">
                                <p class="card-text fw-bold">
                                     Year :${data.Year}
                                </p>
                                  <span class="card-text fw-bold">
                                       Imdb: ${data.imdbRating}/10
                                </span>
                     </div>
                     <div class="d-flex justify-content-between">
                        <p class="card-text fw-bold">
                          Genre:${data.Genre}
                       </p>
                        <p class="card-text fw-bold">
                          Runtime:${data.Runtime}
                        </p>
                     </div>
                
             
              <p class="card-text text-center">
                ${data.Plot}
              </p>
           
            </div>`);
          }

          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });