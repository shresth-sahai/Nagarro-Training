$(document).ready(function(){
    $("#uservalidation").hide();
    $("#emailValidation").hide();
    $("#submit-btn").on('click',function(){
        if(validateform()){
           $("#box").removeClass('show');
        }
    })
$(".click").on('click',function(){
$("#box").toggleClass("show");
})

$(".end").on('click',function(){
$("#box").removeClass('show');
})
var userNameError=true;
var emailError=true;



//username
$("#username").keyup(()=>{
validateUserName();
})
function validateUserName(){
var val=$("#username").val();
if(val.length===0){
   $("#uservalidation").show();
   $("#uservalidation").html("Username Cannot be empty");
   $("#uservalidation").css("color","red");
   userNameError=true;
}
else {
   $("#uservalidation").hide();
   userNameError=false;
}
}


// email validation
$("#email").keyup(()=>{
validateEmail();
})

function  validateEmail(){
var email=$("#email").val();
const emailRegex = new RegExp(
/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
if(email.length===0){
   $("#emailValidation").show();
   $("#emailValidation").html("Email cannot be empty");
   emailError=true;
}
else if(!emailRegex.test(email)){
   $("#emailValidation").show();
   $("#emailValidation").html("Invalid Email");
   $("#emailValidation").css("color","red");
   emailError=true;
}
else{
   
   $("#emailValidation").hide();
   emailError=false;

}

}

// submit
function validateform(){
validateUserName();
validateEmail();
if(userNameError||emailError){
   return false;
}
else{return true;}
}
})