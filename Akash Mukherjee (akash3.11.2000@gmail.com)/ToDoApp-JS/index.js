const input = document.querySelector("#input");
const addBtn = document.querySelector("#add-btn");
const ul = document.querySelector("ul");
const delBtn = document.querySelector(".fa-trash");

function deleteTask(){
  this.style.display = 'none';
}

const addTask = () => {
  let inputVal = input.value;
  if (inputVal !== "") {
    var li = document.createElement("li");
    li.innerHTML = `${inputVal}<i class="fas fa-check fa-trash">`
    li.addEventListener("click", deleteTask);
    ul.appendChild(li);
    input.value = "";
  }
};

input.addEventListener("change", () => {
  addTask();
});

addBtn.addEventListener("click", () => {
  addTask();
});

// $("ul").on("click", ".fa-trash", function () {
//   $(this).parent("li").fadeOut(200);
// });
