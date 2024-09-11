// Select the article body element
const articleBody = document.querySelector(".article-body");

// Define scroll thresholds and state to track which thresholds were reached
const thresholdsReached = {
  25: false,
  50: false,
  100: false,
};

// Function to calculate the scroll depth
const calculateScrollDepth = () => {
  // Total height of the article
  const articleHeight = articleBody.scrollHeight;
  // Height of the user's viewport
  const viewportHeight = window.innerHeight;
  // Scroll position from the top
  const scrollPosition = window.scrollY + viewportHeight;
  // Calculate the percentage scrolled relative to the article height
  const scrollPercentage = (scrollPosition / articleHeight) * 100;

  return scrollPercentage;
};

// Function to dispatch the custom scroll event
const dispatchScrollEvent = (percentage) => {
  const event = new CustomEvent("scrollDepthReached", {
    detail: { percentage },
  });
  window.dispatchEvent(event);
  console.log(`Scroll event dispatched for ${percentage}%`);
};

// Scroll event listener to check the current scroll position
window.addEventListener("scroll", () => {
  const scrollDepth = calculateScrollDepth();
  // Check if each threshold has been reached and dispatch the corresponding event
  Object.keys(thresholdsReached).forEach((threshold) => {
    if (!thresholdsReached[threshold] && scrollDepth >= threshold) {
      thresholdsReached[threshold] = true;
      dispatchScrollEvent(threshold);
    }
  });
});

// Example of how to listen to the custom events
window.addEventListener("scrollDepthReached", (event) => {
  const scrollDepth = event.detail.percentage;
  console.log(`You've scrolled ${scrollDepth}% of the article.`);
});
