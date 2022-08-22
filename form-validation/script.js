// username - 3-8 chars
// email ID - RegEx

$(document).ready(() => {
  var username_error = true;
  var email_error = true;
  var password_error = true;
  var confirm_password_error = true;

  $(".submit-validation").hide();

  $("#username").keyup(() => {
    username_validation();
  });

  $("#email").keyup(() => {
    email_validation();
  });

  $("#password").keyup(() => {
    password_validation();
  });

  $("#confirm-password").keyup(() => {
    confirm_password_validation();
  });

  $("#submit-form").click(() => {
    submit_validation();
  });

  function username_validation() {
    var username = $("#username").val();
    if (username.length < 3 || username.length > 8) {
      if ($(".username-prompt").css("color") != "red") {
        $(".username-prompt")
          .text("Username (Invalid Username)")
          .css("color", "red")
          .css("font-style", "Italic");
        username_error = true;
      }
    } else {
      $(".username-prompt")
        .text("Username ✅")
        .css("color", "unset")
        .css("font-style", "normal");
      username_error = false;
    }
  }

  function email_validation() {
    var email = $("#email").val();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if ($(".email-prompt").css("color") != "red") {
        $(".email-prompt")
          .text("Email (Invalid email)")
          .css("color", "red")
          .css("font-style", "Italic");
        email_error = true;
      }
    } else {
      $(".email-prompt")
        .text("Email-ID ✅")
        .css("color", "unset")
        .css("font-style", "normal");
      email_error = false;
    }
  }

  function password_validation() {
    var password = $("#password").val();
    if (password.length < 8) {
      if ($(".password-prompt").css("color") != "red") {
        $(".password-prompt")
          .text("Password (Invalid password)")
          .css("color", "red")
          .css("font-style", "Italic");
        password_error = true;
      }
    } else {
      $(".password-prompt")
        .text("Password")
        .css("color", "unset")
        .css("font-style", "normal");
      password_error = false;
    }
  }

  function confirm_password_validation() {
    var confirm_password = $("#confirm-password").val();
    if (
      confirm_password !== $("#password").val() ||
      confirm_password.length < 1
    ) {
      if ($(".confirm-password-prompt").css("color") != "red") {
        $(".confirm-password-prompt")
          .text("confirm-password (Invalid confirm-password)")
          .css("color", "red")
          .css("font-style", "Italic");
        confirm_password_error = true;
      }
    } else {
      $(".confirm-password-prompt")
        .text("Password Matched ✅")
        .css("color", "unset")
        .css("font-style", "normal");
      $(".password-prompt")
        .text("Password Matched ✅")
        .css("color", "unset")
        .css("font-style", "normal");
      confirm_password_error = false;
    }
  }

  function submit_validation() {
    $(".my-form").submit((e) => {
      e.preventDefault();
    });
    console.log(username_error);
    if (
      username_error ||
      password_error ||
      email_error ||
      confirm_password_error
    ) {
      $(".submit-validation")
        .text("Invalid Entries, Unable to submit")
        .css("color", "red")
        .show();
    } else {
      $(".submit-validation")
        .text("Submitted Successfully!")
        .css("color", "unset")
        .show();
    }
  }
});
