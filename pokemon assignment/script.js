const btn = document.getElementById("bt");

btn.addEventListener("click", function (e) {
  if (!confirm("Are you sure you want to visit Pokémon Wiki?")) {
    e.preventDefault();
  }
});
