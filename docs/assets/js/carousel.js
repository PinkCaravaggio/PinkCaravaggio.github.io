function carouselStart() {
    let container = document.querySelector('.carousel-items');
    let cards = document.querySelectorAll('.card');
    let indicatorsContainer = document.querySelector('.indicators');
    let leftBtn = document.querySelector('.nav.left');
    let rightBtn = document.querySelector('.nav.right');
    indicatorsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        let dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        indicatorsContainer.appendChild(dot);
    });
    let dots = indicatorsContainer.querySelectorAll('span');
    // Track current index
    let currentIndex = 0;
    // Update indicator function
    function updateIndicators(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    // Scroll to index
    function scrollToIndex(index) {
        container.scrollTo({ left: index * (cards[0].offsetWidth + 10), behavior: 'smooth' });
        updateIndicators(index);
    }
    // Left / Right button logic
    leftBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        scrollToIndex(currentIndex);
    });
    rightBtn.addEventListener('click', () => {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        scrollToIndex(currentIndex);
    });
    // Detect which card is visible on scroll
    container.addEventListener('scroll', () => {
        let scrollLeft = container.scrollLeft;
        let newIndex = Math.round(scrollLeft / (cards[0].offsetWidth + 10));
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateIndicators(currentIndex);
        }
    });
}