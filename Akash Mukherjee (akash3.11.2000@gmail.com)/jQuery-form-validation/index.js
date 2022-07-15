$(document).ready(() => {
  $("#username-validation").hide();
  $("#password-validation").hide();
  $("#confirmpassword-validation").hide();

  let usernameError = true;
  let emailError = true;
  let passwordError = true;
  let confirmPasswordError = true;

  //USERNAME
  $("#username").keyup(() => {
    usernameValidation();
  });

  const usernameValidation = () => {
    let usernameValue = $("#username").val();
    const usernameRegex = new RegExp(/^[a-z0-9_-]{3,10}$/gim);
    if (usernameValue.length === 0) {
      $("#username-validation").show();
      $("#username-validation").text("Username can't be empty");
      usernameError = true;
    } else if (!usernameRegex.test(usernameValue)) {
      $("#username-validation").show();
      $("#username-validation").text("Invalid Username");
      usernameError = true;
    } else {
      $("#username-validation").hide();
      usernameError = false;
    }
  };

  //EMAIL
  $("#email").keyup(() => {
    emailValidation();
  });

  const emailValidation = () => {
    let emailValue = $("#email").val();
    const emailRegex = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (emailValue.length === 0) {
      $("#email-validation").show();
      $("#email-validation").text("Email id can't be empty");
      emailError = true;
    } else if (!emailRegex.test(emailValue)) {
      $("#email-validation").show();
      $("#email-validation").text("Invalid Email id");
      emailError = true;
    } else {
      $("#email-validation").hide();
      emailError = false;
    }
  };

  //PASSWORD
  $("#password").keyup(() => {
    passwordValidation();
  });

  const passwordValidation = () => {
    let passwordValue = $("#password").val();
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (passwordValue.length === 0) {
      $("#password-validation").show();
      $("#password-validation").text("Password can't be empty");
      passwordError = true;
    } else if (!strongRegex.test(passwordValue)) {
      $("#password-validation").show();
      $("#password-validation").text("Invalid Password");
      passwordError = true;
    } else {
      $("#password-validation").hide();
      passwordError = false;
    }
  };

  //CONFIRM PASSWORD
  $("#confirmpassword").keyup(() => {
    confirmPasswordValidation();
  });

  const confirmPasswordValidation = () => {
    let confirmPasswordValue = $("#confirmpassword").val();
    let passwordValue = $("#password").val();
    if (confirmPasswordValue.length === 0) {
      $("#confirmpassword-validation").show();
      $("#confirmpassword-validation").text("Confirm Password can't be empty");
      confirmPasswordError = true;
    } else if (passwordValue !== confirmPasswordValue) {
      $("#confirmpassword-validation").show();
      $("#confirmpassword-validation").text(
        "Password and Confirm Password needs to be same"
      );
      confirmPasswordError = true;
    } else {
      $("#confirmpassword-validation").hide();
      confirmPasswordError = false;
    }
  };

  //SUBMIT
  $("#submit-btn").click(() => {
    usernameValidation();
    emailValidation();
    passwordValidation();
    confirmPasswordValidation();
    if (usernameError || emailError || passwordError || confirmPasswordError) {
      return false;
    }
  });
});
