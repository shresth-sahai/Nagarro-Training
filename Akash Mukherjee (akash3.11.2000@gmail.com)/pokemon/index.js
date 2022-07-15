const checkOutMore = async (e) => {
  const audio = new Audio('./pokeball.mp3')
  await audio.play();
  const page = "./trainers/" + e.target.value + ".html";
  if (confirm("Ready to go?")) {
    window.location.href = page;
  }
};

console.log("JS connected");