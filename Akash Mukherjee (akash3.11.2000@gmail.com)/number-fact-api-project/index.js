const fact = document.querySelector("#fact");
const factText = document.querySelector("#fact-text");
const numberInput = document.querySelector("#number-input");
numberInput.addEventListener("input", getFactAJAX);
function getFactAJAX() {
  let number = numberInput.value;
  if (number != "") {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://numbersapi.com/${number}`);
    xhr.onload = function() {
        if (this.status === 200) {
          console.log(this);
        fact.style.display = "block";
        factText.innerText = this.responseText;
      }
    };
    xhr.send();
  }
}
function getFactFetch() {
  let number = numberInput.value;
  if (number != "") {
    fetch(`http://numbersapi.com/${number}`)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        fact.style.display = "block";
        factText.innerText = data;
      })
      .catch((err) => console.log(err));
  }
}
