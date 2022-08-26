$(document).ready(function() {
    $('#usernameValidate').hide();
    $("#emailValidate").hide();
    $("#passValidate").hide();
    let usernameerr=false;
    let emailerr=false;
    let passerr=false;
    $("#username").keyup(()=>{
        userValidate();
    });
    function userValidate() {
        let val=$('#username').val();
        if(val.length===0) {
            $('#usernameValidate').show();
            $('#usernameValidate').text('Please fill the username');
            usernameerr=true;
        }else if(val.length < 8) {
            $('#usernameValidate').show();
            $('#usernameValidate').text('Username should be of atleast 8 characters');
            usernameerr=true;
        }else {
            $('#usernameValidate').hide();
            usernameerr=false;
        }
    }
    $("#email").keyup(()=>{
        emailValidate();
    });
    function emailValidate() {
        let val=$('#email').val();
        const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(val.length === 0) {
            $('#emailValidate').show();
            $('#emailValidate').text('Please fill the Email');   
            emailerr=false;
        }else if(!emailRegex.test(val)) {
            $('#emailValidate').show();
            $('#emailValidate').text('Invalid email');   
            emailerr=false;
        }else {
            $('#emailValidate').hide();
            emailerr=false;
        } 
    }
    $("#pass").keyup(()=>{
        passValidate();
    });
    function passValidate() {
        let val=$('#pass').val();
        const passRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
            );
            if(val.length === 0) {
                $('#passValidate').show();
                passerr=false;
                $('#passValidate').text('Please fill the password');   
            }else if(!passRegex.test(val)) {
                $('#passValidate').show();
                $('#passValidate').text('Password must contain atleast one small letter, capital letter,and  special character');   
                passerr=false;
            }else {
                $('#passValidate').hide();
                passerr=false;
            } 
        }
    $('#sub').click(function() {
        userValidate();
        emailValidate();
        passValidate();
        if(usernameerr||emailerr||passerr) {
            return false;
        }
    })
})
