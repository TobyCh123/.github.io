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


document.addEventListener('DOMContentLoaded', function() {
const headerHeight = document.querySelector('#navbar').offsetHeight + 20;

document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function(e) {
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

