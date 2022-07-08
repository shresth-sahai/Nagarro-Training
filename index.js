document
.getElementById("pokemon")
.addEventListener("click", function( e ){
    if( ! confirm("Do you want to continue with action.") ){
        e.preventDefault();
    }
});
document
.getElementById("portfolio")
.addEventListener("click", function( e ){ 
    if( ! confirm("Do you want to continue with action.") ){
        e.preventDefault();
    }
});