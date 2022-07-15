const copyArea = document.getElementById("copy-input");
const pasteArea = document.getElementById("paste-input");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

copyArea.value =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

copyBtn.addEventListener("click", async () => {
  copyArea.select();
  copyArea.setSelectionRange(0, 1000);
  try {
    await navigator.clipboard.writeText(copyArea.value);
  } catch (error) {
    document.execCommand("copy");
  }
  copyBtn.innerHTML = `<i class="fa-solid fa-check text-success"></i> Done!`;
  window.setTimeout(() => {
    copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
  }, 2000);
});

pasteBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard
      .readText()
      .then((text) => (pasteArea.innerText = text));
    pasteBtn.innerHTML = `<i class="fa-solid fa-check text-success"></i> Done!`;
    window.setTimeout(() => {
      pasteBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Paste`;
    }, 2000);
  } catch (error) {
    alert("Paste manually, your browser doesn't support clipboard api.");
  }
});
