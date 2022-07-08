const checkOutMore = (e) => {
  const page = "./trainers/" + e.target.value + ".html";
  if (confirm("Ready to go?")) {
    window.location.href = page;
  }
};

console.log("JS connected");
