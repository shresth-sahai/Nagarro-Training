document
.getElementById("pokemon")
.addEventListener("click", function( e ){
    if( ! confirm("Do you want to leave this site?") ){
        e.preventDefault();
    }
});
document
.getElementById("portfolio")
.addEventListener("click", function( e ){ 
    if( ! confirm("Do you want to leave this site?") ){
        e.preventDefault();
    }
});