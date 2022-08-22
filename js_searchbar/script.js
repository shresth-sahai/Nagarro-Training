const userCardTemplate = document.querySelector("#user-template");
const userCardContainer = document.querySelector(".user-cards");
const searchInput = document.getElementById("search");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value);
      user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector(".name");
      const email = card.querySelector(".email");
      const phone = card.querySelector(".phone");
      name.innerHTML = user.name;
      email.innerHTML = user.email;
      phone.innerHTML = user.phone;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, phone: user.phone, element: card };
     
    });
  });
  