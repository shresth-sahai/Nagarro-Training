var buttons = document.getElementsByClassName("button");
var screen = document.getElementById("screen");
var res = 0,
  res2 = 0,
  sign,
  status = 0;

for (var i = 0; i <= buttons.length; i++) {
  if (i == 0) {
    buttons[i].addEventListener("click", function () {
      (res = 0), (res2 = 0);
      screen.innerHTML = "";
      status = 0;
    });
  } else if (i == 1) {
    buttons[i].addEventListener("click", function () {
      if (status == 0) {
        res *= -1;
        var update = res.toString();
        screen.textContent = update;
      } else {
        res2 *= -1;
        var update = res2.toString();
        screen.textContent = update;
      }
    });
  } else if (i == 17) {
    buttons[i].addEventListener("click", function () {
      if (status == 0) {
        var temp = res.toString() + ".";
        screen.textContent = temp;
      } else {
        var temp = res2.toString() + ".";
        screen.textContent = temp;
      }
    });
  } else if (i == 3) {
    buttons[i].addEventListener("click", function () {
      if (res2 == 0) {
        operation(sign);
      }
      sign = "/";
      screen.innerHTML = "";
      status = 1;
    });
  } else if (i == 7) {
    buttons[i].addEventListener("click", function () {
      if (res2 != 0) {
        operation(sign);
      }
      sign = "*";
      screen.innerHTML = "";
      status = 1;
    });
  } else if (i == 11) {
    buttons[i].addEventListener("click", function () {
      if (res2 != 0) {
        operation(sign);
      }
      sign = "-";
      screen.innerHTML = "";
      status = 1;
    });
  } else if (i == 15) {
    buttons[i].addEventListener("click", function () {
      if (res2 != 0) {
        operation(sign);
      }
      sign = "+";
      screen.innerHTML = "";
      status = 1;
    });
  } else if (i == 2) {
    buttons[i].addEventListener("click", function () {
      if (res2 != 0) {
        operation(sign);
      }
      sign = "%";
      screen.innerHTML = "";
      status = 1;
    });
  } else if (i == 18) {
    buttons[i].addEventListener("click", function () {
      operation(sign);
      screen.innerHTML = res.toString();
      status = 0;
    });
  } else {
    buttons[i].addEventListener("click", function () {
      if (status == 0) {
        var temp = screen.innerHTML + parseInt(this.textContent).toString();
        res = parseFloat(temp);
        screen.textContent = res.toString();
      } else {
        var temp = screen.innerHTML + parseInt(this.textContent).toString();
        res2 = parseFloat(temp);
        screen.textContent = res2.toString();
      }
    });
  }
}

function operation(sign) {
  if (sign == "+") {
    res = res + res2;
    res2 = 0;
  } else if (sign == "-") {
    res = res - res2;
    res2 = 0;
  } else if (sign == "*") {
    res = res * res2;
    res2 = 0;
  } else if (sign == "/") {
    res = res / res2;
    res2 = 0;
  } else {
    res = res % res2;
    res2 = 0;
  }
}
