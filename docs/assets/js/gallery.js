const galleryGrid = document.getElementById('gallery-grid');
const galleryCarousel = document.getElementById('gallery-carousel');
const galleryCarouselItem = document.getElementById('carousel-items');
const gridBtn = document.getElementById('grid-btn');
const carouselBtn = document.getElementById('carousel-btn');

let items = []

async function loadItems(){
    let d = await getJSON(entries.published.gallery)
    items = d.items;
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function loadToGrid(){
    galleryGrid.innerHTML = ""
    galleryCarouselItem.innerHTML = ""
    items.forEach(i => {
        galleryGrid.innerHTML +=
            i.link ?
                `<div><a href="${i.link}">Show Statement</a><img src="${i.cover}" alt=""></div>` :
                `<div><img src="${i.cover}" alt=""></div>`
    })
    galleryGrid.style.display = "block";
    galleryCarousel.style.display = "none";
    gridBtn.className = "active";
    carouselBtn.className = "";
}

function loadToCarousel(){
    galleryGrid.innerHTML = ""
    galleryCarouselItem.innerHTML = ""
    items.forEach(i => {
        galleryCarouselItem.innerHTML +=
            i.link ?
                `<div class="card"><a href="${i.link}">Show Statement</a><img src="${i.cover}" alt=""></div>` :
                `<div class="card"><img src="${i.cover}" alt=""></div>`
    })
    carouselStart()
    galleryGrid.style.display = "none";
    galleryCarousel.style.display = "block";
    gridBtn.className = "none";
    carouselBtn.className = "active";
}

gridBtn.addEventListener('click', function(){loadToGrid()})
carouselBtn.addEventListener('click', function(){loadToCarousel()})

loadItems().then(() => {
    loadToGrid()
})
