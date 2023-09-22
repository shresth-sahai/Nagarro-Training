const buttons = document.querySelectorAll("[data-corosel-button]");
      console.log(buttons);
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const offset = button.dataset.coroselButton === "prev" ? -1 : 1;
          const slides = button
            .closest("[data-corosel]")
            .querySelector("[data-slides]");
          const activeSlide = slides.querySelector("[data-active]");
          let newIndex = [...slides.children].indexOf(activeSlide) + offset;
          if (newIndex < 0) newIndex = slides.children.length - 1;
          if (newIndex >= slides.children.length) newIndex = 0;
          slides.children[newIndex].dataset.active = true;
          delete activeSlide.dataset.active;
        });
      });