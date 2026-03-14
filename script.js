document.addEventListener("DOMContentLoaded", () => {
  const runOnceDiv = document.querySelector(".run_once");
  let currentImageIndex = 1;
  const maxImageIndex = 8;
  let animationInterval = null;
  let hasAnimated = false; // Flag to track if animation has run
  let isHovering = false; // Flag to track hover state

  // Function to update the image
  function updateImage() {
    if (!isHovering) {
      // Only update image if not hovering
      runOnceDiv.innerHTML = `<img src="./images/Zustpe${currentImageIndex}.png" alt="Zustpe Image ${currentImageIndex}" class="run-once-img" />`;
      currentImageIndex++;
      if (currentImageIndex > maxImageIndex) {
        clearInterval(animationInterval); // Stop at Zustpe8.png
        animationInterval = null;
        hasAnimated = true; // Mark animation as complete
      }
    }
  }

  // Function to set image source
  function setImage(index) {
    runOnceDiv.innerHTML = `<img src="./images/Zustpe${index}.png" alt="Zustpe Image ${index}" class="run-once-img" />`;
  }

  // Intersection Observer to check if run_once div is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationInterval && !hasAnimated) {
          // Start animation only if div is visible, animation hasn't started, and hasn't completed
          updateImage(); // Show first image immediately
          animationInterval = setInterval(updateImage, 500); // Change image every 500ms
        } else if (!entry.isIntersecting && animationInterval) {
          // Stop animation when div is not visible
          clearInterval(animationInterval);
          animationInterval = null;
          if (!isHovering && hasAnimated) {
            // Ensure Zustpe8.png is shown if animation is complete and not hovering
            setImage(8);
          }
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the div is visible
    },
  );

  // Start observing the run_once div
  observer.observe(runOnceDiv);

  // Hover event handlers
  runOnceDiv.addEventListener("mouseenter", () => {
    isHovering = true; // Mark as hovering
    setImage(7); // Show Zustpe7.png on hover
  });

  runOnceDiv.addEventListener("mouseleave", () => {
    isHovering = false; // Mark as not hovering
    if (hasAnimated) {
      // If animation is complete, show Zustpe8.png
      setImage(8);
    } else if (currentImageIndex <= maxImageIndex) {
      // If animation is not complete, resume from current index
      setImage(currentImageIndex);
      if (runOnceDiv.isIntersecting !== false) {
        // Resume animation only if div is still in viewport
        animationInterval = setInterval(updateImage, 500);
      }
    }
  });
});

// === Landing Page Animation ===

// document.addEventListener("DOMContentLoaded", () => {
//   const landingSection = document.getElementById("landing");
//   const headerSection = document.getElementById("header");
//   const progressBar = document.getElementById("progress-bar");
//   const landingImage = document.getElementById("landing-image");
//   // Set initial width and height for landing page
//   landingSection.style.width = "100vw"; // Full viewport width
//   landingSection.style.height = "115vh"; // Full viewport height
//   // const landingSection = document.getElementById("landing");
//   landingSection.style.paddingTop = "20px"; // nudges content down by 20px
//   landingImage.style.paddingTop = "70px";

//   // Optionally set header section too (maybe hidden initially)
//   headerSection.style.width = "100vw";
//   headerSection.style.height = "auto";

//   const landingImages = [
//     "./images/Zustpe1.png",
//     "./images/Zustpe2.png",
//     "./images/Zustpe3.png",
//     "./images/Zustpe4.png",
//     "./images/Zustpe5.png",
//     "./images/Zustpe6.png",
//     "./images/Zustpe7.png",
//     "./images/Zustpe8.png",
//   ];

//   // === Disable scroll during loading ===
//   document.body.style.overflow = "hidden";

//   // Preload images
//   landingImages.forEach((src) => {
//     const img = new Image();
//     img.src = src;
//   });
//   // --------------------hide--------------------

//   // ------------------------complete--------------

//   let currentLandingImage = 0;
//   const imageDisplayTime = 2000 / landingImages.length;

//   function changeLandingImage() {
//     if (currentLandingImage < landingImages.length) {
//       landingImage.classList.remove("visible");
//       setTimeout(() => {
//         landingImage.src = landingImages[currentLandingImage];
//         landingImage.classList.add("visible");
//         currentLandingImage++;
//         if (currentLandingImage < landingImages.length) {
//           setTimeout(changeLandingImage, imageDisplayTime);
//         }
//       }, 30);
//     }
//   }

//   landingImage.src = landingImages[0];
//   landingImage.classList.add("visible");
//   setTimeout(changeLandingImage, imageDisplayTime);

//   let progress = 0;
//   const steps = 100;
//   const intervalTime = 2000 / steps;

//   const progressInterval = setInterval(() => {
//     progress++;
//     progressBar.style.width = `${progress}%`;

//     if (progress >= 100) {
//       clearInterval(progressInterval);
//       transitionToHeader();
//     }
//   }, intervalTime);

//   function transitionToHeader() {
//     landingSection.style.display = "none";
//     headerSection.classList.remove("hidden");

//     // === Re-enable scroll ===
//     document.body.style.overflow = "auto";

//     // Scroll to header smoothly
//     headerSection.scrollIntoView({ behavior: "smooth" });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const landingSection = document.getElementById("landing");
  const headerSection = document.getElementById("header");

  const urlParams = new URLSearchParams(window.location.search);
  const skipAnimation = urlParams.get("skip") === "true";

  if (skipAnimation) {
    landingSection.style.display = "none";
    headerSection.classList.remove("hidden");
    document.body.style.overflow = "auto";
    return;
  }

  const progressBar = document.getElementById("progress-bar");
  const landingImage = document.getElementById("landing-image");

  landingSection.style.width = "100vw";
  landingSection.style.height = "115vh";
  landingSection.style.paddingTop = "20px";
  landingImage.style.paddingTop = "70px";
  headerSection.style.width = "100vw";
  headerSection.style.height = "auto";

  const landingImages = [
    "./images/Zustpe1.png",
    "./images/Zustpe2.png",
    "./images/Zustpe3.png",
    "./images/Zustpe4.png",
    "./images/Zustpe5.png",
    "./images/Zustpe6.png",
    "./images/Zustpe7.png",
    "./images/Zustpe8.png",
  ];

  document.body.style.overflow = "hidden";

  landingImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let currentLandingImage = 0;
  const imageDisplayTime = 2000 / landingImages.length;

  function changeLandingImage() {
    if (currentLandingImage < landingImages.length) {
      landingImage.classList.remove("visible");
      setTimeout(() => {
        landingImage.src = landingImages[currentLandingImage];
        landingImage.classList.add("visible");
        currentLandingImage++;
        if (currentLandingImage < landingImages.length) {
          setTimeout(changeLandingImage, imageDisplayTime);
        }
      }, 30);
    }
  }

  landingImage.src = landingImages[0];
  landingImage.classList.add("visible");
  setTimeout(changeLandingImage, imageDisplayTime);

  let progress = 0;
  const steps = 100;
  const intervalTime = 2000 / steps;

  const progressInterval = setInterval(() => {
    progress++;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(progressInterval);
      transitionToHeader();
    }
  }, intervalTime);

  function transitionToHeader() {
    landingSection.style.display = "none";
    headerSection.classList.remove("hidden");
    document.body.style.overflow = "auto";
    headerSection.scrollIntoView({ behavior: "smooth" });
  }
});

// landing page End

// ------------------ THIS IS FOR BUTTON EFFFECT -------------------

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".get-started-button");
  const arrowImg = document.querySelector(".arrow-img");

  if (button && arrowImg) {
    // On hover (mouse enters button)
    button.addEventListener("mouseenter", () => {
      arrowImg.src = "./images/arrow2.png"; // Change to the white arrow
    });

    // On hover out (mouse leaves button)
    button.addEventListener("mouseleave", () => {
      arrowImg.src = "./images/arrow1.png"; // Revert back to the default arrow
    });
  }
});
// ------------------------------ this is profile imagess-------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const bgImages = [
    "./images/bg15.png",
    "./images/bg14.png",
    "./images/bg13.png",
    "./images/bg12.png",
    "./images/bg11.png",
    "./images/bg10.png",
    "./images/bg9.png",
    "./images/bg8.png",
    "./images/bg7.png",
    "./images/bg5.png",
    "./images/bg4.png",
    "./images/bg3.png",
    "./images/bg2.png",
    "./images/bg1.png",
  ];

  // Preload background images
  bgImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Animate background
  const founderSection = document.getElementById("founderSection");
  let bgIndex = 0;

  function updateBackground() {
    founderSection.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    bgIndex = (bgIndex + 1) % bgImages.length;
  }

  updateBackground(); // Initial call
  setInterval(updateBackground, 2000); // Change every 5 seconds
});
// === Background Images Preload ===

document.addEventListener("DOMContentLoaded", () => {
  const backgroundImages = [
    "./images/bg15.png",
    "./images/bg14.png",
    "./images/bg13.png",
    "./images/bg12.png",
    "./images/bg11.png",
    "./images/bg10.png",
    "./images/bg9.png",
    "./images/bg8.png",
    "./images/bg7.png",
    "./images/bg5.png",
    "./images/bg4.png",
    "./images/bg3.png",
    "./images/bg2.png",
    "./images/bg1.png",
  ];

  backgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// --------------------- stats start-------------------------
const elements = {
  thumb: document.getElementById("scrollThumb"),
  track: document.querySelector(".scroll-indicator-track"),
  mainNumber: document.getElementById("mainNumber"),
  mainLabel: document.getElementById("mainLabel"),
  peekFarLeft: document.getElementById("peekFarLeft"),
  peekLeft: document.getElementById("peekLeft"),
  peekRight: document.getElementById("peekRight"),
  peekFarRight: document.getElementById("peekFarRight"),
  dataEntries: [...document.querySelectorAll("#statsData > div")],
};

const horizontalCarousel = document.getElementById("carousel");

let isDragging = false;
let pointerStartX = 0;
let thumbStartOffset = 0;
let maxThumbTravel = 0;

function calculateCurrentIndex() {
  if (maxThumbTravel <= 0) return 0;

  const thumbPosition = parseFloat(elements.thumb.style.left) || 0;
  const fraction = thumbPosition / maxThumbTravel;
  const lastIndex = elements.dataEntries.length - 1;

  return Math.round(fraction * lastIndex);
}

function showStatsAtIndex(index) {
  index = Math.max(0, Math.min(index, elements.dataEntries.length - 1));

  const entryAt = (i) =>
    elements.dataEntries[i] ?? { dataset: { n: "", l: "" } };

  elements.mainNumber.textContent = entryAt(index).dataset.n;
  elements.mainLabel.textContent = entryAt(index).dataset.l;

  const updatePreview = (element, targetIndex, visible = true) => {
    if (targetIndex >= 0 && targetIndex < elements.dataEntries.length) {
      element.querySelector(".peek-number").textContent =
        entryAt(targetIndex).dataset.n;
      element.querySelector(".peek-label").textContent =
        entryAt(targetIndex).dataset.l;
      element.style.opacity = visible ? "0.6" : "0";
    } else {
      element.style.opacity = "0";
    }
  };

  updatePreview(elements.peekFarLeft, index - 2);
  updatePreview(elements.peekLeft, index - 1);
  updatePreview(elements.peekRight, index + 1);
  updatePreview(elements.peekFarRight, index + 2);
}

function startDragging(e) {
  isDragging = true;

  pointerStartX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  thumbStartOffset = elements.thumb.offsetLeft || 0;
  maxThumbTravel = elements.track.offsetWidth - elements.thumb.offsetWidth;

  document.body.classList.add("no-select");
  e.preventDefault();
}

function drag(e) {
  if (!isDragging) return;

  const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  let newThumbLeft = thumbStartOffset + (currentX - pointerStartX);

  newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbTravel));

  elements.thumb.style.left = `${newThumbLeft}px`;

  showStatsAtIndex(calculateCurrentIndex());

  e.preventDefault();
}

function stopDragging() {
  if (!isDragging) return;
  isDragging = false;
  document.body.classList.remove("no-select");

  const index = calculateCurrentIndex();
  const snapPosition =
    (index / (elements.dataEntries.length - 1)) * maxThumbTravel;

  elements.thumb.style.left = `${snapPosition}px`;
  showStatsAtIndex(index);
}

elements.thumb.addEventListener("mousedown", startDragging);
elements.thumb.addEventListener("touchstart", startDragging, {
  passive: false,
});

window.addEventListener("mousemove", drag);
window.addEventListener("touchmove", drag, { passive: false });

window.addEventListener("mouseup", stopDragging);
window.addEventListener("touchend", stopDragging);

// horizontalCarousel.addEventListener(
//   "wheel",
//   (e) => {
//     e.preventDefault();

//     let delta = 0;

//     if (Math.abs(e.deltaX) > 0.4) {
//       delta = e.deltaX;
//     } else if (Math.abs(e.deltaY) > 0.4) {
//       delta = e.deltaY;
//     } else {
//       return;
//     }

//     const sensitivity = 1.9;
//     let movement = delta * sensitivity;

//     let currentLeft = parseFloat(elements.thumb.style.left) || 0;
//     let newLeft = currentLeft + movement;

//     newLeft = Math.max(0, Math.min(newLeft, maxThumbTravel));

//     elements.thumb.style.left = `${newLeft}px`;
//     showStatsAtIndex(calculateCurrentIndex());
//   },
//   { passive: false },
// );


horizontalCarousel.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    let delta = 0;

    if (Math.abs(e.deltaX) > 0.4) {
      delta = e.deltaX;
    } else if (Math.abs(e.deltaY) > 0.4) {
      delta = e.deltaY;
    } else {
      return;
    }

    const sensitivity = 1.9;
    let movement = delta * sensitivity;

    if (window.innerWidth <= 1024) {
      let currentLeft = parseFloat(elements.thumb.style.left) || 0;
      let newLeft = currentLeft + movement;
      newLeft = Math.max(0, Math.min(newLeft, maxThumbTravel));
      elements.thumb.style.left = `${newLeft}px`;
      showStatsAtIndex(calculateCurrentIndex());
    } else {
      horizontalCarousel.scrollLeft += movement;
    }
  },
  { passive: false },
);

function resetToCenter() {
  maxThumbTravel = elements.track.offsetWidth - elements.thumb.offsetWidth;

  const centerIndex = Math.floor(elements.dataEntries.length / 2);
  const initialLeft =
    (centerIndex / (elements.dataEntries.length - 1)) * maxThumbTravel;

  elements.thumb.style.left = `${initialLeft}px`;
  showStatsAtIndex(centerIndex);
}

resetToCenter();

window.addEventListener("resize", resetToCenter);

// --------------------- stats End-------------------------

// ------------------------------- this is 2nd page -------------------------------

// Our Company Card Section

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".container.comp_cont");
  const c1 = document.querySelector(".company-container.company-one");
  const c2 = document.querySelector(".company-container.company-two");
  const c3 = document.querySelector(".company-container.company-three");

  const allowBackwardScroll = true;
  let scrollCount = 0;
  let isLocked = false;
  let inSection = false;
  let scrolling = false;
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let entryDebounceTimer = null;

  function setStep(el, active) {
    el.classList.toggle("visible", active);
    el.classList.toggle("moved", active);
  }

  function updateCompanies() {
    setStep(c1, scrollCount >= 1);
    setStep(c2, scrollCount >= 2);
    setStep(c3, scrollCount >= 3);
    lockScroll();
  }

  function resetCompanies() {
    scrollCount = 0;
    [c1, c2, c3].forEach((c) =>
      c.classList.remove("visible", "moved", "scroll"),
    );
    console.log("Reset companies: scrollCount =", scrollCount);
  }

  function showAllCompanies() {
    scrollCount = 3;
    [c1, c2, c3].forEach((c) => {
      c.classList.add("visible", "moved");
      c.classList.remove("scroll");
    });
    console.log("Show all companies");
  }

  function lockScroll() {
    if (!isLocked) {
      isLocked = true;
      document.body.classList.add("lock-scroll");
      section.classList.add("lock-scroll");
      console.log("Scroll locked");
    }
  }

  function unlockScroll() {
    if (isLocked) {
      isLocked = false;
      document.body.classList.remove("lock-scroll");
      section.classList.remove("lock-scroll");
      console.log("Scroll unlocked");
    }
  }

  function handleScrollOut() {
    if (inSection) {
      inSection = false;
      clearTimeout(entryDebounceTimer);
      unlockScroll();
      [c1, c2, c3].forEach((c) => c.classList.remove("scroll"));
      console.log("Scrolled out of section");
    }
  }

  function stepScroll(isDown) {
    if (scrolling || !inSection || !isLocked) {
      console.log("Scroll skipped");
      return;
    }
    scrolling = true;
    [c1, c2, c3].forEach((c) => c.classList.remove("scroll"));

    if (isDown) {
      if (scrollCount < 3) {
        scrollCount++;
        updateCompanies();
        if (scrollCount === 1) c1.classList.add("scroll");
        else if (scrollCount === 2) c2.classList.add("scroll");
        else if (scrollCount === 3) c3.classList.add("scroll");
      } else {
        console.log(
          "All companies revealed. Auto-scrolling to next section...",
        );
        unlockScroll();
        // setTimeout(() => scrollToNextSection(), 300);
      }
    } else {
      if (!allowBackwardScroll) {
        console.log("Backward scroll disabled");
      } else if (scrollCount > 0) {
        scrollCount--;
        updateCompanies();
        if (scrollCount === 2) c2.classList.add("scroll");
        else if (scrollCount === 1) c1.classList.add("scroll");
        else if (scrollCount === 0) {
          console.log(
            "At first company. Scroll again to go to previous section.",
          );
        }
      } else {
        console.log("Scrolling to previous section...");
        unlockScroll();
        setTimeout(() => scrollToPreviousSection(), 100);
      }
    }

    setTimeout(() => {
      scrolling = false;
      console.log("Ready for next scroll");
    }, 800);
  }

  document.addEventListener(
    "wheel",
    (e) => {
      if (inSection && isLocked && scrolling === false) {
        e.preventDefault();
        stepScroll(e.deltaY > 0);
      }
    },
    { passive: false },
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const currentScrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = currentScrollTop > lastScrollTop;
        lastScrollTop = currentScrollTop;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          clearTimeout(entryDebounceTimer);
          entryDebounceTimer = setTimeout(() => {
            if (!inSection) {
              inSection = true;
              lockScroll();
              if (isScrollingDown) {
                console.log("Entered section scrolling down (debounced)");
                resetCompanies();
              } else {
                console.log("Entered section scrolling up (debounced)");
                showAllCompanies();
              }
            }
          }, 200);
        } else if (entry.intersectionRatio < 0.2) {
          handleScrollOut();
        }
      });
    },
    {
      threshold: [0.2, 0.3],
      rootMargin: "0px",
    },
  );

  observer.observe(section);

  function scrollToNextSection() {
    const nextSection = document.querySelector(".white");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Next section not found.");
    }
  }

  function scrollToPreviousSection() {
    const prevSection = document.querySelector(".fullpage");
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Previous section not found.");
    }
  }

  window.addEventListener("resize", () => {
    if (inSection) {
      observer.unobserve(section);
      setTimeout(() => observer.observe(section), 100);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isLocked) {
      unlockScroll();
      inSection = false;
      resetCompanies();
    }
  });
});

const scrollingText = document.getElementById("scrolling-text");
scrollingText.innerHTML += scrollingText.innerHTML;
let pos = 0;
const speed = 5;

function animate() {
  pos -= speed;
  if (pos <= -scrollingText.offsetWidth / 2) {
    pos = 0;
  }
  scrollingText.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

animate();

// this is circle paged  ----------------------------------------

// end of circle apge ---------------------------------------------

// carousel

const track = document.getElementById("carouselTrack");
const prevButton2 = document.getElementById("prev2");
const nextButton2 = document.getElementById("next2");

const cards1 = document.querySelectorAll(".slide-card");
const total = cards.length;
const angleStep = 360 / total;
const radius = 400;

cards1.forEach((card, index) => {
  const angle = angleStep * index;
  card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

let rotation = 0;

function spin(direction) {
  rotation += direction * angleStep;
  track.style.transform = `rotateY(${rotation}deg)`;
}

prevButton2.addEventListener("click", () => spin(1));
nextButton2.addEventListener("click", () => spin(-1));

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") spin(1);
  if (e.key === "ArrowRight") spin(-1);
});
