document.addEventListener('DOMContentLoaded', function () {
  var revealButtons = document.querySelectorAll('.reveal-button');
  var revealedContents = document.querySelectorAll('.revealed-content');

  revealButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Find the corresponding revealed content based on data attribute or other method
      var targetId = this.getAttribute('data-target');
      var revealedContent = document.getElementById(targetId);

      // Toggle the 'hidden' class
      if (revealedContent) {
        revealedContent.classList.toggle('hidden');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const headerHeight = document.querySelector('#navbar').offsetHeight + 20;

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetOffset = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }
    });
  });
});

// JavaScript for gallery functionality
const images = [
  "resources/PowerBi/KPIs.png",
  "resources/PowerBi/KPIs 2.png",
  "resources/PowerBi/Weather-Tracker.png",
  "resources/PowerBi/Daily-Tracker-Hourly.png"
];

const image_captions = [
  "An extract of a KPI dashboard I created.",
  "Another extract of a KPI dashboard I created.",
  "Daily weather tracker displaying the forecast from the MET Office each day - used to compare with internal data trends",
  "Daily tracker to track panel metrics - This is an hour breakdown for a specific day. I also made daily and 7 day rolling on other tabs"
]

let currentIndex = 0;
const imageElement = document.querySelector('.gallery-image');
const imageCaption = document.querySelector('.image-caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showImage(index) {
  imageElement.src = images[index];
  imageCaption.textContent = image_captions[index];
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Display initial image
showImage(currentIndex);